'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _vacancy = require('../models/vacancy');

var _vacancy2 = _interopRequireDefault(_vacancy);

var _apply = require('../models/apply');

var _apply2 = _interopRequireDefault(_apply);

var _requireAuth = require('../middleware/require-auth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import vacancyModel from '../models/vacancy';
var router = _express2.default.Router();

router.get('/', function (_ref, res) {
	var query = _ref.query;

	//VacancyModel.find({}, {auth_tokens: 0, refresh_tokens: 0}).
	var page = parseInt(query.page || 0);
	var perPage = parseInt(query.perPage || 20);
	var ownerId = query.ownerId;
	_vacancy2.default.paginate(ownerId ? { ownerId: ownerId } : {}, { offset: page * perPage, limit: perPage }).then(function (result) {
		var docs = result.docs;
		var docsPromiseArr = [];
		docs.forEach(function (doc) {
			docsPromiseArr.push(new Promise(function (resolve, reject) {
				var newDoc = doc._doc;
				console.log(doc._id);
				_apply2.default.count({ eventId: String(doc._id) }).then(function (r) {
					newDoc.applyCount = r;
					resolve(newDoc);
				});
			}));
		});
		Promise.all(docsPromiseArr).then(function (r) {

			res.json({
				status: 0,
				message: "",
				devMessage: "",
				data: r,
				metaData: {
					totalPages: result.total % perPage == 0 ? result.total / perPage : parseInt(result.total / perPage) + 1,
					perPage: perPage,
					currentPage: page
				}
			});
		});
	}).catch(function (error) {
		return res.json({
			status: -1,
			message: "",
			devMessage: error
		});
	});
});

router.get('/:vacancyId', _requireAuth2.default, function (_ref2, res) {
	var vacancyId = _ref2.params.vacancyId,
	    user = _ref2.user;

	//ApplyModel.count({eventId: vacancyId}).then(r => res.json({r})).catch( e => res.json({e}));
	var promiseArr = [];
	promiseArr.push(_apply2.default.findOne({ applyerId: user._id, eventId: vacancyId }));
	//console.log("vacancy ", vacancyId)
	promiseArr.push(_apply2.default.count({ eventId: vacancyId }));
	_vacancy2.default.findById(vacancyId).then(function (result) {
		Promise.all(promiseArr).then(function (r) {
			//let vacancy = Object.assign({}, result)._doc;
			var vacancy = result._doc;
			vacancy.applyCount = r[1];
			vacancy.isUserApplyed = r[0] == null ? false : true;
			res.json({
				status: 0,
				message: "",
				devMessage: r,
				data: vacancy
			});
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

router.post('/:vacancyId/apply', _requireAuth2.default, function (_ref4, res) {
	var vacancyId = _ref4.params.vacancyId,
	    user = _ref4.user;

	if (user.type == "user") {
		_apply2.default.findOne({ applyerId: user._id, eventId: vacancyId }).then(function (a) {
			if (a != null) {
				res.json({
					status: -1,
					message: 'You are applyed already'
				});
			} else {
				var apply = new _apply2.default({ applyerId: user._id, eventType: "vacancy", eventId: vacancyId });
				apply.save().then(function () {
					res.json({
						status: 0,
						message: 'Apply successfull created'
					});
				}).catch(function (error) {
					res.json({
						status: error.code || -1,
						message: "",
						//devMessage: resMessage(error.message)
						devMessage: error.message
					});
				});
			}
		});
	} else {
		res.json({
			status: 7,
			message: "",
			devMessage: "You don't have permissions to do it"
		});
	}
});

router.put('/:vacancyId', _requireAuth2.default, function (_ref5, res) {
	var vacancyId = _ref5.params.vacancyId,
	    body = _ref5.body,
	    user = _ref5.user;

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

router.delete('/:vacancyId', _requireAuth2.default, function (_ref6, res) {
	var vacancyId = _ref6.params.vacancyId,
	    user = _ref6.user;

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