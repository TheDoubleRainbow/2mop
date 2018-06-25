'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportJwt = require('passport-jwt');

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var opts = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: _config2.default.jwtSecret
};

exports.default = function (passport) {
  return passport.use(new _passportJwt.Strategy(opts, function (payload, done) {
    _user2.default.findById(payload.sub).then(function (user) {
      if (user) {
        return done(null, user);
      }

      return done(new Error("User not found."), null);
    }).catch(function (err) {
      return done(err, false);
    });
  }));
};
//# sourceMappingURL=passport.js.map
//# sourceMappingURL=passport.js.map