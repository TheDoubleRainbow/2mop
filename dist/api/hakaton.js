'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _hakaton = require('../models/hakaton');

var _hakaton2 = _interopRequireDefault(_hakaton);

var _apply = require('../models/apply');

var _apply2 = _interopRequireDefault(_apply);

var _requireAuth = require('../middleware/require-auth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import hakatonModel from '../models/hakaton';
var router = _express2.default.Router();

router.get('/', function (_ref, res) {
	var query = _ref.query;

	//HakatonModel.find({}, {auth_tokens: 0, refresh_tokens: 0}).
	var page = parseInt(query.page || 0);
	var perPage = parseInt(query.perPage || 20);
	var owner = query.owner;
	_hakaton2.default.paginate(owner ? { owner: owner } : {}, { offset: page * perPage, limit: perPage }).then(function (result) {
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

router.get('/:hakatonId', function (_ref2, res) {
	var hakatonId = _ref2.params.hakatonId;

	_hakaton2.default.findById(hakatonId).then(function (result) {
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
			devMessage: "Hakaton not found"
		});
	});
});

router.post('/', _requireAuth2.default, function (_ref3, res) {
	var body = _ref3.body,
	    user = _ref3.user;

	if (user.type == "company") {
		var hakaton = new _hakaton2.default({ name: body.name, photo: body.photo, description: body.description, ownerId: user._id, location: { placeId: body.placeId, formattedAddress: body.formattedAddress || 'City name' }, date: body.date });
		hakaton.save().then(function () {
			res.json({
				status: 0,
				message: 'Hakaton successfull created',
				data: hakaton
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

router.post('/:hakatonId/apply', _requireAuth2.default, function (_ref4, res) {
	var hakatonId = _ref4.params.hakatonId,
	    user = _ref4.user;

	if (user.type == "user") {
		_apply2.default.findOne({ applyerId: user._id, eventId: hakatonId }).then(function (a) {
			if (a != null) {
				res.json({
					status: -1,
					message: 'You are applyed already'
				});
			} else {
				var apply = new _apply2.default({ applyerId: user._id, eventType: "hakaton", eventId: hakatonId });
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

router.post('/:hakatonId/apply', _requireAuth2.default, function (_ref5, res) {
	var hakatonId = _ref5.params.hakatonId,
	    user = _ref5.user;

	if (user.type == "user") {
		_apply2.default.findOne({ applyerId: user._id, eventId: hakatonId }).then(function (a) {
			if (a != null) {
				res.json({
					status: -1,
					message: 'You are applyed already'
				});
			} else {
				var apply = new _apply2.default({ applyerId: user._id, eventType: "hakaton", eventId: hakatonId });
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

router.put('/:hakatonId', _requireAuth2.default, function (_ref6, res) {
	var hakatonId = _ref6.params.hakatonId,
	    body = _ref6.body,
	    user = _ref6.user;

	// let updates = {name: body.name, avatar: body.avatar, birthDate: body.birthDate, description: body.description, skills: body.skills, phoneNumper: body.phoneNumper};
	// let update = {name: body.name};
	_hakaton2.default.findOneAndUpdate({ _id: hakatonId, ownerId: user._id }, { name: body.name, photo: body.photo, description: body.description, ownerId: user._id, location: { placeId: body.placeId, formattedAddress: body.formattedAddress || 'City name' }, date: body.date }, { new: true }).then(function (doc) {
		res.json({
			status: 0,
			message: "",
			devMessage: "Vacation successfull update",
			data: doc
		});
	}).catch(function (error) {
		res.json({
			status: -1,
			message: "",
			devMessage: error
		});
	});
});

router.delete('/:hakatonId', _requireAuth2.default, function (_ref7, res) {
	var hakatonId = _ref7.params.hakatonId,
	    user = _ref7.user;

	//	if(hakatonId == hakaton._id){
	//HakatonModel.findByIdAndRemove(hakatonId)
	_hakaton2.default.findOneAndRemove({ _id: hakatonId, ownerId: user._id }).then(function (result) {
		if (result == null) {
			res.json({
				status: 0,
				message: "",
				devMessage: "Invalid hakaton id or you do not have permissions"
			});
		} else {
			res.json({
				status: 0,
				message: "",
				devMessage: "Hakaton successfuly deleted"
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
//# sourceMappingURL=hakaton.js.map