'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _excursion = require('../models/excursion');

var _excursion2 = _interopRequireDefault(_excursion);

var _requireAuth = require('../middleware/require-auth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (_ref, res) {
	var query = _ref.query;

	//ExcursionModel.find({}, {auth_tokens: 0, refresh_tokens: 0}).
	var page = parseInt(query.page || 0);
	var perPage = parseInt(query.perPage || 20);
	var owner = query.owner;
	_excursion2.default.paginate(owner ? { owner: owner } : {}, { offset: page * perPage, limit: perPage }).then(function (result) {
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

router.get('/:excursionId', function (_ref2, res) {
	var excursionId = _ref2.params.excursionId;

	_excursion2.default.findById(excursionId).then(function (result) {
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
			devMessage: "Excursion not found"
		});
	});
});

router.post('/', _requireAuth2.default, function (_ref3, res) {
	var body = _ref3.body,
	    user = _ref3.user;

	if (user.type == "company") {
		var excursion = new _excursion2.default({ name: body.name, photo: body.photo, description: body.description, ownerId: user._id, location: { placeId: body.placeId, formattedAddress: body.formattedAddress || "City name" }, date: body.date });
		excursion.save().then(function () {
			res.json({
				status: 0,
				message: 'Excursion successfull created',
				data: excursion
			});
		}).catch(function (error) {
			res.json({
				status: error.code || -1,
				message: "",
				//devMessage: resMessage(error.message)
				devMessage: error
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

router.put('/:excursionId', _requireAuth2.default, function (_ref4, res) {
	var excursionId = _ref4.params.excursionId,
	    body = _ref4.body,
	    user = _ref4.user;

	// let updates = {name: body.name, avatar: body.avatar, birthDate: body.birthDate, description: body.description, skills: body.skills, phoneNumper: body.phoneNumper};
	// let update = {name: body.name};
	_excursion2.default.findOneAndUpdate({ _id: excursionId, ownerId: user._id }, { name: body.name, photo: body.photo, description: body.description, ownerId: user._id, location: { placeId: body.placeId, formattedAddress: body.formattedAddress || "City name" }, date: body.date }, { new: true }).then(function (doc) {
		if (doc == null) {
			res.json({
				status: -1,
				message: "",
				devMessage: "Invalid excursion id or you do not have permissions",
				data: doc
			});
		} else {
			res.json({
				status: 0,
				message: "",
				devMessage: "Excursion successfull update",
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

router.delete('/:excursionId', _requireAuth2.default, function (_ref5, res) {
	var excursionId = _ref5.params.excursionId,
	    user = _ref5.user;

	//	if(excursionId == excursion._id){
	//ExcursionModel.findByIdAndRemove(excursionId)
	_excursion2.default.findOneAndRemove({ _id: excursionId, ownerId: user._id }).then(function (result) {
		if (result == null) {
			res.json({
				status: 0,
				message: "",
				devMessage: "Invalid excursion id or you do not have permissions"
			});
		} else {
			res.json({
				status: 0,
				message: "",
				devMessage: "Excursion successfuly deleted"
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
//# sourceMappingURL=excursion.js.map