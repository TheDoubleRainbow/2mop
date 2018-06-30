'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _vacancy = require('../models/vacancy');

var _vacancy2 = _interopRequireDefault(_vacancy);

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
	var ownerId = query.ownerId;
	_vacancy2.default.paginate(ownerId ? { ownerId: ownerId } : {}, { offset: page * perPage, limit: perPage }).then(function (result) {
		return res.json({
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
			devMessage: error
		});
	});
});

router.get('/:vacancyId', function (_ref2, res) {
	var vacancyId = _ref2.params.vacancyId;

	_vacancy2.default.findById(vacancyId).then(function (result) {
		return res.json({
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
		var vacancy = new _vacancy2.default({ name: body.name, photo: body.photo, description: body.description, ownerId: user._id, requiredSkills: body.requiredSkills, location: { placeId: body.placeId, formattedAddress: body.formattedAddress || "City Name" }, types: body.types });
		vacancy.save().then(function () {
			res.json({
				status: 0,
				message: 'Vacancy successfull created',
				data: vacancy
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
			status: 7,
			message: "",
			devMessage: "You don't have permissions to do it"
		});
	}
});

router.put('/:vacancyId', _requireAuth2.default, function (_ref4, res) {
	var vacancyId = _ref4.params.vacancyId,
	    body = _ref4.body,
	    user = _ref4.user;

	// let updates = {name: body.name, avatar: body.avatar, birthDate: body.birthDate, description: body.description, skills: body.skills, phoneNumper: body.phoneNumper};
	// let update = {name: body.name};
	_vacancy2.default.findOneAndUpdate({ _id: vacancyId, ownerId: user._id }, { name: body.name, photo: body.photo, description: body.description, ownerId: user._id, requiredSkills: body.requiredSkills, location: { placeId: body.placeId, formattedAddress: body.formattedAddress || "City Name" }, types: body.types }, { new: true }).then(function (doc) {
		if (doc == null) {
			res.json({
				status: -1,
				message: "",
				devMessage: "Invalid vacancy id or you do not have permissions",
				data: doc
			});
		} else {
			res.json({
				status: 0,
				message: "",
				devMessage: "Vacancy successfull update",
				data: doc
			});
		}
	}).catch(function (error) {
		res.json({
			status: -1,
			message: "",
			devMessage: error
		});
	});
});

router.delete('/:vacancyId', _requireAuth2.default, function (_ref5, res) {
	var vacancyId = _ref5.params.vacancyId,
	    user = _ref5.user;

	//	if(vacancyId == vacancy._id){
	//VacancyModel.findByIdAndRemove(vacancyId)
	_vacancy2.default.findOneAndRemove({ _id: vacancyId, ownerId: user._id }).then(function (result) {
		if (result == null) {
			res.json({
				status: 0,
				message: "",
				devMessage: "Invalid vacancy id or you do not have permissions"
			});
		} else {
			res.json({
				status: 0,
				message: "",
				devMessage: "Vacancy successfuly deleted"
			});
		}
	}).catch(function (err) {
		return res.json({
			status: -1,
			message: "",
			devMessage: err
		});
	});
	// } else {
	// 	res.json({
	// 		status: -1,
	// 		message: "",
	// 		devMessage: "You don't have permissions to do it",
	// 	})
	// }
});

exports.default = router;
//# sourceMappingURL=vacancy.js.map