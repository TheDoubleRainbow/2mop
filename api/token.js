import resource from 'resource-router-middleware';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import config from '../config';

const tokenApi = resource({
    create({ body, headers }, res) {
        const refreshToken = body.refreshToken || "";
        jwt.verify(refreshToken, config.jwtSecret, (err, decoded) => {
            if(!err && decoded.type == "refresh"){
                UserModel.findById(decoded.sub).then(user => {
                    if (user) {

                        user.refresh_tokens = user.refresh_tokens.filter(e => e !== refreshToken);

                        if( headers && headers['authorization']){
                            user.auth_tokens = user.auth_tokens.filter(e => e !== headers['authorization']);
                        }

                        var authToken = "bearer " + jwt.sign({ sub: user._id, type: 'auth' }, config.jwtSecret, {
                        expiresIn: config.authTokenExpiresIn
                        });
                
                        var refreshToken = jwt.sign({ sub: user._id, type: 'refresh' }, config.jwtSecret, {
                        expiresIn: config.refreshTokenExpiresIn
                        });
                
                        user.auth_tokens.push(authToken);
                        user.refresh_tokens.push(refreshToken);
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
                            devMessage: resMessage(error.message)
                        }))
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
                    devMessage: err.toString(),
                })
            }
        });
    },
});

export default tokenApi;