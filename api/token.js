import resource from 'resource-router-middleware';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import config from '../config';

const tokenApi = resource({
    create({ body, headers }, res) {
        const refreshToken = body.refreshToken || "";
        jwt.verify(String(refreshToken), config.jwtSecret, (err, decoded) => {
            if(!err && decoded.type == "refresh"){
                
                let Model = null;

                switch(decoded.userType){
                    case 'user': 
                      Model =  UserModel;
                      break;
                    case 'company':
                      Model = CompanyModel;
                      break;
                }

                Model.findById(decoded.sub).select({authTokens: 1, refreshTokens: 1}).then(user => {
                    if (user) {
                        let refreshToken = body.refreshToken || "";
                        console.log(refreshToken);
                        //console.log(user.refreshTokens);
                        if(!user.refreshTokens.includes(refreshToken)){
                            res.json({
                                status: -1,
                                message: "",
                                devMessage: "Invalid refresh token",
                            })
                            return;
                        }

                        user.refreshTokens = user.refreshTokens.filter(e => e != refreshToken);

                        if( headers && headers['authorization']){
                            user.auth_tokens = user.authTokens.filter(e => e != headers['authorization']);
                        }

                        var authToken = "bearer " + jwt.sign({ sub: user._id, type: 'auth', userType: decoded.userType }, config.jwtSecret, {
                        expiresIn: config.authTokenExpiresIn
                        });
                
                        refreshToken = jwt.sign({ sub: user._id, type: 'refresh', userType: decoded.userType }, config.jwtSecret, {
                        expiresIn: config.refreshTokenExpiresIn
                        });
                
                        user.authTokens.push(authToken);
                        user.refreshTokens.push(refreshToken);
                        let refreshTokensPA = [];
                        let accessTokensPA = [];
                        user.refreshTokens.forEach((element, index) => {
                            refreshTokensPA.push(new Promise((resolve, reject) => {
                                jwt.verify(element, config.jwtSecret, (err, decoded) => {
                                    if(decoded){
                                        resolve(index);
                                    }
                                });
                            }))
                        });
                        user.accessTokens.forEach((element, index) => {
                            accessTokensPA.push(new Promise((resolve, reject) => {
                                jwt.verify(element, config.jwtSecret, (err, decoded) => {
                                    if(err){
                                        resolve(index);
                                    }
                                });
                            }))
                        });
                        Promise.all([Promise.all(refreshTokensPA), Promise.all(accessTokensPA)]).then(result => {
                            result[0].forEach(item=>{
                                user.refreshTokens.splice(item, 1);
                            })
                            result[1].forEach(item=>{
                                user.accessTokens.splice(item, 1);
                            })
                            user.save()
                            .then(
                                res.json({
                                status: 0,
                                message: "",
                                devMessage: 'Token refreshed successful',
                                data: {
                                    authToken,
                                    expiresIn: config.authTokenExpiresIn,
                                    refreshToken
                                }
                            }))
                            .catch(error => res.json({
                                status: -1,
                                message: "",
                                devMessage: error
                            }))
                        })
                    } else {
                        res.json({
                            status: -1,
                            message: "",
                            devMessage: "User fetch error",
                        })
                    }
                })
            } else {
                res.json({
                    status: 1,
                    message: "",
                    devMessage: "Invalid refresh token",
                })
            }
        });
    },
});

export default tokenApi;