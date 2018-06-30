'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
    // const refreshToken = req.headers["authorization"]
    // jwt.verify(refreshToken, config.jwtSecret, (err, decoded) => {
    //     console.log({err, decoded});
    // })
    _passport2.default.authenticate('jwt', function (err, user, info) {
        console.log(err);
        if (err) {
            return next(err);
        }
        if (!user) {
            res.json({
                status: 5,
                message: "",
                devMessage: info.message
            });
            res.end();
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
};
//# sourceMappingURL=require-auth.js.map