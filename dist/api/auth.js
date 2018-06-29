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

var _company = require('../models/company');

var _company2 = _interopRequireDefault(_company);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authApi = (0, _resourceRouterMiddleware2.default)({
  create: function create(_ref, res) {
    var _ref$body = _ref.body,
        email = _ref$body.email,
        password = _ref$body.password;

    var promiseArray = [];
    promiseArray.push(new Promise(function (resolve, reject) {
      _user2.default.findOne({ email: email }).select({ password: 1, authTokens: 1, refreshTokens: 1 }).then(function (result) {
        resolve(result);
      });
    }));
    promiseArray.push(new Promise(function (resolve, reject) {
      _company2.default.findOne({ email: email }).select({ password: 1, authTokens: 1, refreshTokens: 1 }).then(function (result) {
        resolve(result);
      });
    }));

    //promiseArray.push(CompanyModel.findOne({ email }).select("+password"));
    Promise.all(promiseArray).then(function (result) {
      if ((0, _fp.isEmpty)(result[0]) && (0, _fp.isEmpty)(result[1])) {
        return res.send({
          status: 3,
          message: 'Authentication failed. User not found.'
        });
      }

      var userType = "";

      if (!(0, _fp.isEmpty)(result[0])) {
        result = result[0];
        userType = "user";
      }

      if (!(0, _fp.isEmpty)(result[1])) {
        result = result[1];
        userType = "company";
      }

      console.log('result ', result);

      result.comparePassword(password, function (err, isMatch) {
        if (isMatch && !err) {
          var authToken = "bearer " + _jsonwebtoken2.default.sign({ sub: result._id, type: 'auth', userType: userType }, _config2.default.jwtSecret, {
            expiresIn: _config2.default.authTokenExpiresIn
          });

          var refreshToken = _jsonwebtoken2.default.sign({ sub: result._id, type: 'refresh', userType: userType }, _config2.default.jwtSecret, {
            expiresIn: _config2.default.refreshTokenExpiresIn
          });

          result.authTokens.push(authToken);
          result.refreshTokens.push(refreshToken);
          return result.save(function (err) {
            if (err) {
              res.json({ success: false, message: err.toString });
            } else {
              res.json({
                success: true,
                message: 'Authentication successfull',
                data: {
                  userType: userType,
                  authToken: authToken,
                  expiresIn: _config2.default.authTokenExpiresIn,
                  refreshToken: refreshToken
                }

              });
            }
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
  },
  delete: function _delete() {}
});

exports.default = authApi;
//# sourceMappingURL=auth.js.map