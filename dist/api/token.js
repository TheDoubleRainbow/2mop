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

var tokenApi = (0, _resourceRouterMiddleware2.default)({
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

                        var authToken = "bearer " + _jsonwebtoken2.default.sign({ sub: user._id, type: 'auth' }, _config2.default.jwtSecret, {
                            expiresIn: _config2.default.authTokenExpiresIn
                        });

                        var refreshToken = _jsonwebtoken2.default.sign({ sub: user._id, type: 'refresh' }, _config2.default.jwtSecret, {
                            expiresIn: _config2.default.refreshTokenExpiresIn
                        });

                        user.auth_tokens.push(authToken);
                        user.refresh_tokens.push(refreshToken);
                        user.save().then(res.json({
                            status: 0,
                            message: "",
                            devMessage: 'Token refreshed successful',
                            data: {
                                authToken: authToken,
                                expiresIn: _config2.default.authTokenExpiresIn,
                                refreshToken: refreshToken
                            }
                        })).catch(function (error) {
                            return res.json({
                                status: -1,
                                message: "",
                                devMessage: resMessage(error.message)
                            });
                        });
                    } else {
                        res.json({
                            status: -1,
                            message: "",
                            devMessage: "User fetch error"
                        });
                    }
                });
            } else {
                res.json({
                    status: 1,
                    message: "",
                    devMessage: err.toString()
                });
            }
        });
    }
});

exports.default = tokenApi;
//# sourceMappingURL=token.js.map