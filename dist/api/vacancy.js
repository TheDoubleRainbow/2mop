'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _vacancy2 = require('../models/vacancy');

var _vacancy3 = _interopRequireDefault(_vacancy2);

var _requireAuth = require('../middleware/require-auth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (_ref, res) {
	var query = _ref.query;

	//VacancyModel.find({}, {auth_tokens: 0, refresh_tokens: 0}).
	var page = parseInt(query.page || 0);
	var perPage = parseInt(query.perPage || 20);
	var employer = query.employer;
	_vacancy3.default.paginate(employer ? { employer: employer } : {}, { offset: page * perPage, limit: perPage }).then(function (result) {
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

router.get('/:vacancyId', function (_ref2, req) {
	var vacancyId = _ref2.params.vacancyId;

	_vacancy3.default.findById(vacancyId).then(function (result) {
		return res.send({
			status: 0,
			message: "",
			devMessage: "",
			data: result
		});
	}).catch(function (error) {
		return res.json({
			status: -1,
			message: "",
			devMessage: "Vacancy not found"
		});
	});
});

router.post('/', _requireAuth2.default, function (_ref3, res) {
	var body = _ref3.body,
	    user = _ref3.user;

	if (user.type == "company") {
		var _vacancy = new _vacancy3.default({ name: body.name, avatar: body.avatar, description: body.description, employerId: user._id, requiredSkills: body.requiredSkills });
		_vacancy.save().then(function () {
			res.json({
				status: 0,
				message: 'Vacancy successfull created',
				data: _vacancy
			});
		}).catch(function (error) {
			res.json({
				status: error.code || -1,
				message: "",
				//devMessage: resMessage(error.message)
				devMessage: error.message
			});
		});
	} else {
		res.json({
			status: -1,
			message: "",
			devMessage: "You don't have permissions to do it"
		});
	}
});

router.put('/:vacancyId', _requireAuth2.default, function (_ref4, res) {
	var vacancyId = _ref4.params.vacancyId,
	    body = _ref4.body,
	    user = _ref4.user;

	var updates = { name: body.name, avatar: body.avatar, birthDate: body.birthDate, description: body.description, skills: body.skills, phoneNumper: body.phoneNumper };

	_vacancy3.default.update({ _id: vacancyId, employer: user._id }, body).then(function (result) {
		return res.json({
			status: 0,
			message: "",
			devMessage: result
		});
	}).catch(function (err) {
		return res.json({
			status: -1,
			message: "",
			devMessage: err.toString
		});
	});
});

router.delete('/:vacancyId', _requireAuth2.default, function (_ref5, res) {
	var vacancyId = _ref5.params.vacancyId,
	    body = _ref5.body,
	    company = _ref5.company;

	if (vacancyId == vacancy._id) {
		_vacancy3.default.findByIdAndRemove(vacancyId).then(function () {
			return res.json({
				status: 0,
				message: "",
				devMessage: "Vacancy successfuly deleted"
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
			status: -1,
			message: "",
			devMessage: "You don't have permissions to do it"
		});
	}
});

exports.default = router;
//# sourceMappingURL=vacancy.js.map