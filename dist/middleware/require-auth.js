'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
    _passport2.default.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {

            res.json({
                status: 2,
                message: "",
                devMessage: info.message
            });
            res.end();
        }
        next();
    })(req, res, next);
};
//# sourceMappingURL=require-auth.js.map