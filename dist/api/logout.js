'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logoutApi = (0, _resourceRouterMiddleware2.default)({
    create: function create(_ref, res) {
        var body = _ref.body,
            headers = _ref.headers;

        var refreshToken = body.refreshToken || "";
        _jsonwebtoken2.default.verify(refreshToken, _config2.default.jwtSecret, function (err, decoded) {
            if (!err && decoded.type == "refresh") {
                _user2.default.findById(decoded.sub).then(function (user) {
                    if (user) {
                        user.refresh_tokens = user.refresh_tokens.filter(function (e) {
                            return e !== refreshToken;
                        });

                        if (headers && headers['authorization']) {
                            user.auth_tokens = user.auth_tokens.filter(function (e) {
                                return e !== headers['authorization'];
                            });
                        }
                        user.save().then(res.json({
                            status: 0,
                            message: 'Logout successful'
                        })).catch(function (error) {
                            return res.json({
                                status: -1,
                                message: 'Logout failture',
                                devMessage: resMessage(error.message)
                            });
                        });
                    }
                });
            } else {
                res.status(400).json({
                    succsess: false,
                    message: err.toString()
                });
            }
        });
    }
});

exports.default = logoutApi;
//# sourceMappingURL=logout.js.map