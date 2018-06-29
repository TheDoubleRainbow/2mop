'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _package = require('../../package.json');

var _requireAuth = require('../middleware/require-auth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _logout = require('./logout');

var _logout2 = _interopRequireDefault(_logout);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _register = require('./register');

var _register2 = _interopRequireDefault(_register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = (0, _express.Router)();

api.use('/auth', _auth2.default);
api.use('/logout', _logout2.default);
api.use('/user', _requireAuth2.default, _user2.default);
api.use('/register', _register2.default);
api.use('/token', _token2.default);

api.get('/', function (req, res) {
	res.json({ version: _package.version });
});

exports.default = api;
//# sourceMappingURL=index.js.map