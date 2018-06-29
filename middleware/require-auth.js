import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config';

export default (req, res, next) => {
    // const refreshToken = req.headers["authorization"]
    // jwt.verify(refreshToken, config.jwtSecret, (err, decoded) => {
    //     console.log({err, decoded});
    // })
    passport.authenticate('jwt', (err, user, info) => {
        console.log(err);
        if (err) { return next(err); }
        if (!user) {
            res.json({
                status: 2,
                message: "",
                devMessage: info.message
            })
            res.end();
        } else {
            req.user = user;
            next();
        }
    })(req, res, next)
}

