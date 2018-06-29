import resource from 'resource-router-middleware';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import config from '../config';

const logoutApi = resource({
        create ({ body, headers }, res) {
        const refreshToken = body.refreshToken || "";
        jwt.verify(refreshToken, config.jwtSecret, (err, decoded) => {
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

                Model.findById(decoded.sub).then(user => {
                    if (user) {
                        user.refresh_tokens = user.refresh_tokens.filter(e => e !== refreshToken);

                        if( headers && headers['authorization']){
                            user.auth_tokens = user.auth_tokens.filter(e => e !== headers['authorization']);
                        }
                        user.save()
                        .then(
                            res.json({
                            status: 0,
                            message: 'Logout successful',
                        }))
                        .catch(error => res.json({
                            status: -1,
                            message: 'Logout failture',
                            devMessage: error.message
                        }))
                    }
                }).catch( (error) => {
                    res.json({
                        status: -1,
                        message: "",
                        devMessage: error,
                    });
                })
            } else {
                res.status(400).json({
                    succsess: false,
                    message: err.toString(),
                })
            }
        })
    }
});

export default logoutApi;