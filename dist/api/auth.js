'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fp = require('lodash/fp');

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authApi = (0, _resourceRouterMiddleware2.default)({
  create: function create(_ref, res) {
    var _ref$body = _ref.body,
        email = _ref$body.email,
        password = _ref$body.password;

    _user2.default.findOne({ email: email }).select("+password").then(function (result) {
      if ((0, _fp.isEmpty)(result)) {
        return res.status(401).send({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      }

      result.comparePassword(password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = _jsonwebtoken2.default.sign({ sub: result._id }, _config2.default.jwtSecret, {
            expiresIn: "2 days"
          });

          return res.json({
            success: true,
            message: 'Authentication successfull',
            token: token
          });
        }

        res.status(401).send({
          success: false,
          message: 'Authentication failed. Passwords did not match.'
        });
      });
    }).catch(function (err) {
      return res.send(err.toString());
    });
  }
});

exports.default = authApi;
//# sourceMappingURL=auth.js.map