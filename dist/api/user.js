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

var _requireAuth = require('../middleware/require-auth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (_ref, res) {
	var query = _ref.query;

	//UserModel.find({}, {auth_tokens: 0, refresh_tokens: 0}).
	var page = parseInt(query.page || 0);
	var perPage = parseInt(query.perPage || 20);
	_user2.default.paginate({}, { offset: page * perPage, limit: perPage }).then(function (result) {
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

router.get('/:userId', function (_ref2, res) {
	var userId = _ref2.params.userId;

	_user2.default.findById(userId).then(function (result) {
		return res.send({
			status: 0,
			message: "",
			devMessage: "",
			data: result
		});
	}).catch(function (error) {
		return res.json({
			status: 6,
			message: "",
			devMessage: "User not found"
		});
	});
});

router.put('/:userId', _requireAuth2.default, function (_ref3, res) {
	var userId = _ref3.params.userId,
	    body = _ref3.body,
	    user = _ref3.user;

	if (userId == user._id) {
		_user2.default.findByIdAndUpdate(userId, { name: body.name, avatar: body.avatar, birthDate: body.birthDate, description: body.description, skills: body.skills, phoneNumper: body.phoneNumper, desiredWork: body.desiredWork }).then(function () {
			return res.json({
				status: 0,
				message: "",
				devMessage: "User data update success"
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

router.delete('/:userId', _requireAuth2.default, function (_ref4, res) {
	var userId = _ref4.params.userId,
	    body = _ref4.body,
	    user = _ref4.user;

	if (userId == user._id) {
		_user2.default.findByIdAndRemove(userId).then(function () {
			return res.json({
				status: 0,
				message: "",
				devMessage: "User successfuly deleted"
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

// const userApi = resource({
// 	id: 'userId',

// 	index(req, res) {
// 		req.checkAuth();
// 		UserModel.find({}, {auth_tokens: 0, refresh_tokens: 0})
// 			.then(result => res.send(result))
// 			.catch(error => res.status(400).send(error))
// 	},

// 	read({ params: { userId } }, res) {
// 		UserModel.findById(userId)
// 			.then(result => res.send(result))
// 			.catch(() => res.status(404).send(resMessage('User not found.')))
// 	},

// 	update({ params: { userId }, body }, res) {
// 		UserModel.findByIdAndUpdate(userId, body)
// 			.then(() => UserModel.findById(userId).then(result => res.send(result)))
// 			.catch(() => res.status(404).send(resMessage('User not found.')))
// 	},

// 	delete({ params: { userId } }, res) {
// 		UserModel.findByIdAndRemove(userId)
// 			.then(() => res.send(resMessage('User successfully deleted!')))
// 			.catch(() => res.status(404).send(resMessage('User not found.')))
// 	}
// });

// export default userApi;
//# sourceMappingURL=user.js.map