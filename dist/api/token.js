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

var _company = require('../models/company');

var _company2 = _interopRequireDefault(_company);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenApi = (0, _resourceRouterMiddleware2.default)({
    create: function create(_ref, res) {
        var body = _ref.body,
            headers = _ref.headers;

        var refreshToken = body.refreshToken || "";
        _jsonwebtoken2.default.verify(String(refreshToken), _config2.default.jwtSecret, function (err, decoded) {
            if (!err && decoded.type == "refresh") {

                var Model = null;

                switch (decoded.userType) {
                    case 'user':
                        Model = _user2.default;
                        break;
                    case 'company':
                        Model = _company2.default;
                        break;
                }

                Model.findById(decoded.sub).select({ authTokens: 1, refreshTokens: 1 }).then(function (user) {
                    if (user) {
                        var _refreshToken = body.refreshToken || "";
                        console.log(_refreshToken);
                        //console.log(user.refreshTokens);
                        if (!user.refreshTokens.includes(_refreshToken)) {
                            res.json({
                                status: -1,
                                message: "",
                                devMessage: "Invalid refresh token"
                            });
                            return;
                        }

                        user.refreshTokens = user.refreshTokens.filter(function (e) {
                            return e != _refreshToken;
                        });

                        if (headers && headers['authorization']) {
                            user.auth_tokens = user.authTokens.filter(function (e) {
                                return e != headers['authorization'];
                            });
                        }

                        var authToken = "bearer " + _jsonwebtoken2.default.sign({ sub: user._id, type: 'auth', userType: decoded.userType }, _config2.default.jwtSecret, {
                            expiresIn: _config2.default.authTokenExpiresIn
                        });

                        _refreshToken = _jsonwebtoken2.default.sign({ sub: user._id, type: 'refresh', userType: decoded.userType }, _config2.default.jwtSecret, {
                            expiresIn: _config2.default.refreshTokenExpiresIn
                        });

                        user.authTokens.push(authToken);
                        user.refreshTokens.push(_refreshToken);
                        var refreshTokensPA = [];
                        var accessTokensPA = [];
                        user.refreshTokens.forEach(function (element, index) {
                            refreshTokensPA.push(new Promise(function (resolve, reject) {
                                _jsonwebtoken2.default.verify(element, _config2.default.jwtSecret, function (err, decoded) {
                                    if (decoded) {
                                        resolve(index);
                                    }
                                });
                            }));
                        });
                        user.accessTokens.forEach(function (element, index) {
                            accessTokensPA.push(new Promise(function (resolve, reject) {
                                _jsonwebtoken2.default.verify(element, _config2.default.jwtSecret, function (err, decoded) {
                                    if (err) {
                                        resolve(index);
                                    }
                                });
                            }));
                        });
                        Promise.all([Promise.all(refreshTokensPA), Promise.all(accessTokensPA)]).then(function (result) {
                            result[0].forEach(function (item) {
                                user.refreshTokens.splice(item, 1);
                            });
                            result[1].forEach(function (item) {
                                user.accessTokens.splice(item, 1);
                            });
                            user.save().then(res.json({
                                status: 0,
                                message: "",
                                devMessage: 'Token refreshed successful',
                                data: {
                                    authToken: authToken,
                                    expiresIn: _config2.default.authTokenExpiresIn,
                                    refreshToken: _refreshToken
                                }
                            })).catch(function (error) {
                                return res.json({
                                    status: -1,
                                    message: "",
                                    devMessage: error
                                });
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
                    devMessage: "Invalid refresh token"
                });
            }
        });
    }
});

exports.default = tokenApi;
//# sourceMappingURL=token.js.map