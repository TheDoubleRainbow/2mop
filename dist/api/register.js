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
	return (0, _fp.merge)({
		name: {
			full: (0, _fp.get)('name.first', body) + ' ' + (0, _fp.get)('name.last', body)
		}
	}, body);
};

var userApi = (0, _resourceRouterMiddleware2.default)({
	create: function create(_ref, res) {
		var body = _ref.body;

		var user = new _user2.default(addFullNameToBody(body));

		user.save().then(function (_ref2) {
			var _id = _ref2._id;
			return _user2.default.findById(_id).then(function (result) {
				return res.send(result);
			});
		}).catch(function (error) {
			return res.status(400).send((0, _resMessage2.default)(error.message));
		});
	}
});

exports.default = userApi;
//# sourceMappingURL=register.js.map