import passport from 'passport';

export default (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            
            res.json({
                status: 2,
                message: "",
                devMessage: info.message
            })
            res.end();
        }
        next();
    })(req, res, next)
}

