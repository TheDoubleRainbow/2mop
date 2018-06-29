'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _fp = require('lodash/fp');

var _resMessage = require('../lib/res-message');

var _resMessage2 = _interopRequireDefault(_resMessage);

var _company = require('../models/company');

var _company2 = _interopRequireDefault(_company);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var companyApi = (0, _resourceRouterMiddleware2.default)({
	id: 'companyId',

	index: function index(_ref, res) {
		var params = _ref.params;

		_company2.default.find().then(function (result) {
			return res.send(result);
		}).catch(function (error) {
			return res.status(400).send(error);
		});
	},
	read: function read(_ref2, res) {
		var companyId = _ref2.params.companyId;

		_company2.default.findById(companyId).then(function (result) {
			return res.send(result);
		}).catch(function () {
			return res.status(404).send((0, _resMessage2.default)('Company not found.'));
		});
	},
	update: function update(_ref3, res) {
		var companyId = _ref3.params.companyId,
		    body = _ref3.body;

		_company2.default.findByIdAndUpdate(companyId, body).then(function () {
			return _company2.default.findById(companyId).then(function (result) {
				return res.send(result);
			});
		}).catch(function () {
			return res.status(404).send((0, _resMessage2.default)('Company not found.'));
		});
	},
	delete: function _delete(_ref4, res) {
		var companyId = _ref4.params.companyId;

		_company2.default.findByIdAndRemove(companyId).then(function () {
			return res.send((0, _resMessage2.default)('Company successfully deleted!'));
		}).catch(function () {
			return res.status(404).send((0, _resMessage2.default)('Company not found.'));
		});
	}
});

exports.default = companyApi;
//# sourceMappingURL=company.js.map