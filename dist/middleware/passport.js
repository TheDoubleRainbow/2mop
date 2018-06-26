'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportJwt = require('passport-jwt');

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _company = require('../models/company');

var _company2 = _interopRequireDefault(_company);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: _config2.default.jwtSecret
};

exports.default = function (passport) {
  return passport.use(new _passportJwt.Strategy(opts, function (payload, done) {
    if (payload.type !== "auth") {
      return done(new Error("Invalid token"), null);
    }

    var Model = null;

    switch (payload.userType) {
      case 'user':
        Model = _user2.default;
        break;
      case 'company':
        Model = _company2.default;
        break;
      default:
        return done(new Error("User not found."), null);
    }

    Model.findById(payload.sub).then(function (user) {
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