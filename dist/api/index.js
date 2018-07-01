'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _package = require('../../package.json');

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _logout = require('./logout');

var _logout2 = _interopRequireDefault(_logout);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _company = require('./company');

var _company2 = _interopRequireDefault(_company);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _register = require('./register');

var _register2 = _interopRequireDefault(_register);

var _vacancy = require('./vacancy');

var _vacancy2 = _interopRequireDefault(_vacancy);

var _excursion = require('./excursion');

var _excursion2 = _interopRequireDefault(_excursion);

var _hakaton = require('./hakaton');

var _hakaton2 = _interopRequireDefault(_hakaton);

var _course = require('./course');

var _course2 = _interopRequireDefault(_course);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import cors from 'cors';

//import requireAuth from '../middleware/require-auth';
var api = (0, _express.Router)();

api.use('/auth', _auth2.default);
api.use('/logout', _logout2.default);
api.use('/user', _user2.default);
api.use('/company', _company2.default);
api.use('/register', _register2.default);
api.use('/token', _token2.default);

api.use('/vacancy', _vacancy2.default);
api.use('/excursion', _excursion2.default);
api.use('/hakaton', _hakaton2.default);
api.use('/course', _course2.default);

api.get('/', function (req, res) {
	res.json({ version: _package.version });
});

exports.default = api;
//# sourceMappingURL=index.js.map