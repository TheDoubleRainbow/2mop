import resource from 'resource-router-middleware';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import config from '../config';

const logoutApi = resource({
        create ({ body, headers }, res) {
        const refreshToken = body.refreshToken || "";
        jwt.verify(refreshToken, config.jwtSecret, (err, decoded) => {
            if(!err && decoded.type == "refresh"){
                UserModel.findById(decoded.sub).then(user => {
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
                            devMessage: resMessage(error.message)
                        }))
                    }
                });
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