'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _course = require('../models/course');

var _course2 = _interopRequireDefault(_course);

var _apply = require('../models/apply');

var _apply2 = _interopRequireDefault(_apply);

var _requireAuth = require('../middleware/require-auth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import courseModel from '../models/course';
var router = _express2.default.Router();

router.get('/', function (_ref, res) {
	var query = _ref.query;

	//CourseModel.find({}, {auth_tokens: 0, refresh_tokens: 0}).
	var page = parseInt(query.page || 0);
	var perPage = parseInt(query.perPage || 20);
	var owner = query.owner;
	_course2.default.paginate(owner ? { owner: owner } : {}, { offset: page * perPage, limit: perPage }).then(function (result) {
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

router.get('/:courseId', function (_ref2, res) {
	var courseId = _ref2.params.courseId;

	_course2.default.findById(courseId).then(function (result) {
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
			devMessage: "Course not found"
		});
	});
});

router.post('/', _requireAuth2.default, function (_ref3, res) {
	var body = _ref3.body,
	    user = _ref3.user;

	if (user.type == "company") {
		var course = new _course2.default({ name: body.name, photo: body.photo, description: body.description, ownerId: user._id, location: { placeId: body.placeId, formattedAddress: body.formattedAddress || 'City name' }, date: body.date });
		course.save().then(function () {
			res.json({
				status: 0,
				message: 'Course successfull created',
				data: course
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

router.post('/:courseId/apply', _requireAuth2.default, function (_ref4, res) {
	var courseId = _ref4.params.courseId,
	    user = _ref4.user;

	if (user.type == "user") {
		_apply2.default.findOne({ applyerId: user._id, eventId: courseId }).then(function (a) {
			if (a != null) {
				res.json({
					status: -1,
					message: 'You are applyed already'
				});
			} else {
				var apply = new _apply2.default({ applyerId: user._id, eventType: "course", eventId: courseId });
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

router.put('/:courseId', _requireAuth2.default, function (_ref5, res) {
	var courseId = _ref5.params.courseId,
	    body = _ref5.body,
	    user = _ref5.user;

	// let updates = {name: body.name, avatar: body.avatar, birthDate: body.birthDate, description: body.description, skills: body.skills, phoneNumper: body.phoneNumper};
	// let update = {name: body.name};
	_course2.default.findOneAndUpdate({ _id: courseId, ownerId: user._id }, { name: body.name, photo: body.photo, description: body.description, ownerId: user._id, location: { placeId: body.placeId, formattedAddress: body.formattedAddress || 'City name' }, date: body.date }, { new: true }).then(function (doc) {
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

router.delete('/:courseId', _requireAuth2.default, function (_ref6, res) {
	var courseId = _ref6.params.courseId,
	    user = _ref6.user;

	//	if(courseId == course._id){
	//CourseModel.findByIdAndRemove(courseId)
	_course2.default.findOneAndRemove({ _id: courseId, ownerId: user._id }).then(function (result) {
		if (result == null) {
			res.json({
				status: 0,
				message: "",
				devMessage: "Invalid course id or you do not have permissions"
			});
		} else {
			res.json({
				status: 0,
				message: "",
				devMessage: "Course successfuly deleted"
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
//# sourceMappingURL=course.js.map