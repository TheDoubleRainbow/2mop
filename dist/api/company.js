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

var _requireAuth = require('../middleware/require-auth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _requireAuth2.default, function (_ref, res) {
	var query = _ref.query;

	//CompanyModel.find({}, {auth_tokens: 0, refresh_tokens: 0}).
	var page = parseInt(query.page || 0);
	var perPage = parseInt(query.perPage || 20);
	_company2.default.paginate({}, { offset: page * perPage, limit: perPage }).then(function (result) {
		return res.send({
			status: 0,
			message: "",
			devMessage: "",
			data: result.docs,
			metaData: {
				totalPages: result.total % perPage == 0 ? result.total / perPage : parseInt(result.total / perPage) + 1,
				perPage: perPage,
				currentPage: page
			}
		});
	}).catch(function (error) {
		return res.json({
			status: -1,
			message: "",
			devMessage: error.toString()
		});
	});
});

router.get('/:companyId', function (_ref2, req) {
	var companyId = _ref2.params.companyId;

	_company2.default.findById(companyId).then(function (result) {
		return res.send({
			status: 0,
			message: "",
			devMessage: "",
			data: result
		});
	}).catch(function (error) {
		return res.json({
			status: 8,
			message: "",
			devMessage: "Company not found"
		});
	});
});

router.put('/:companyId', _requireAuth2.default, function (_ref3, res) {
	var companyId = _ref3.params.companyId,
	    body = _ref3.body,
	    company = _ref3.company;

	if (companyId == company._id) {
		_company2.default.findByIdAndUpdate(companyId, { name: body.name, avatar: body.avatar, webSite: body.webSite, description: body.description, phoneNumper: body.phoneNumper, location: body.location }).then(function () {
			return res.json({
				status: 0,
				message: "",
				devMessage: "Company data update success"
			});
		}).catch(function (err) {
			return res.json({
				status: -1,
				message: "",
				devMessage: err.toString
			});
		});
	} else {
		res.json({
			status: 7,
			message: "",
			devMessage: "You don't have permissions"
		});
	}
});

router.delete('/:companyId', _requireAuth2.default, function (_ref4, res) {
	var companyId = _ref4.params.companyId,
	    body = _ref4.body,
	    company = _ref4.company;

	if (companyId == company._id) {
		_company2.default.findByIdAndRemove(companyId).then(function () {
			return res.json({
				status: 0,
				message: "",
				devMessage: "Company successfuly deleted"
			});
		}).catch(function (err) {
			return res.json({
				status: -1,
				message: "",
				devMessage: err.toString
			});
		});
	} else {
		res.json({
			status: 7,
			message: "",
			devMessage: "You don't have permissions to do it"
		});
	}
});
exports.default = router;
//# sourceMappingURL=company.js.map