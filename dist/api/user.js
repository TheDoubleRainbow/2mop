'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _fp = require('lodash/fp');

var _resMessage = require('../lib/res-message');

var _resMessage2 = _interopRequireDefault(_resMessage);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addFullNameToBody = function addFullNameToBody(body) {
	if ((0, _fp.isEmpty)((0, _fp.get)('name', body))) {
		return body;
	}

	return (0, _fp.merge)({
		name: {
			full: (0, _fp.get)('name.first', body) + ' ' + (0, _fp.get)('name.last', body)
		}
	}, body);
};

var userApi = (0, _resourceRouterMiddleware2.default)({
	id: 'userId',

	index: function index(_ref, res) {
		var params = _ref.params;

		_user2.default.find().then(function (result) {
			return res.send(result);
		}).catch(function (error) {
			return res.status(400).send(error);
		});
	},
	read: function read(_ref2, res) {
		var userId = _ref2.params.userId;

		_user2.default.findById(userId).then(function (result) {
			return res.send(result);
		}).catch(function () {
			return res.status(404).send((0, _resMessage2.default)('User not found.'));
		});
	},
	update: function update(_ref3, res) {
		var userId = _ref3.params.userId,
		    body = _ref3.body;

		_user2.default.findByIdAndUpdate(userId, addFullNameToBody(body)).then(function () {
			return _user2.default.findById(userId).then(function (result) {
				return res.send(result);
			});
		}).catch(function () {
			return res.status(404).send((0, _resMessage2.default)('User not found.'));
		});
	},
	delete: function _delete(_ref4, res) {
		var userId = _ref4.params.userId;

		_user2.default.findByIdAndRemove(userId).then(function () {
			return res.send((0, _resMessage2.default)('User successfully deleted!'));
		}).catch(function () {
			return res.status(404).send((0, _resMessage2.default)('User not found.'));
		});
	}
});

exports.default = userApi;
//# sourceMappingURL=user.js.map