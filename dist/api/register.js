'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _company = require('../models/company');

var _company2 = _interopRequireDefault(_company);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const addFullNameToBody = body => merge({
// 	name: {
// 		full: `${get('name.first', body)} ${get('name.last', body)}`
// 	},
// }, body);

var userApi = (0, _resourceRouterMiddleware2.default)({
	create: function create(_ref, res) {
		var body = _ref.body;

		//let user = new UserModel(addFullNameToBody(body));
		console.log(_company2.default.schema);
		var user = null;

		var userData = body.userData;

		switch (body.type) {
			case 'user':
				user = new _user2.default({ name: userData.name, email: userData.email, password: userData.password });
				break;
			case 'company':
				user = new _company2.default({ name: userData.name, email: userData.email, password: userData.password });
				break;
			default:
				res.json({
					status: -1,
					message: "",
					devMessage: "Invalid or missing type"
				});
				res.end();
		}
		var authToken = "bearer " + _jsonwebtoken2.default.sign({ sub: user._id, type: 'auth', userType: body.type }, _config2.default.jwtSecret, {
			expiresIn: _config2.default.authTokenExpiresIn
		});

		var refreshToken = _jsonwebtoken2.default.sign({ sub: user._id, type: 'refresh', userType: body.type }, _config2.default.jwtSecret, {
			expiresIn: _config2.default.refreshTokenExpiresIn
		});

		user.authTokens.push(authToken);
		user.refreshTokens.push(refreshToken);

		user.save().then(function () {
			res.json({
				status: 0,
				message: 'Registration successfull',
				data: {
					userType: body.type,
					uId: user._id,
					authToken: authToken,
					expiresIn: _config2.default.authTokenExpiresIn,
					refreshToken: refreshToken
				}
			});
		}).catch(function (error) {
			var message = "Registration failture";
			if (error.code == 11000) {
				message = "User with such email is exists";
				res.json({
					status: 2,
					message: message,
					//devMessage: resMessage(error.message)
					devMessage: error
				});
			} else {
				res.json({
					status: error.code || -1,
					message: message,
					//devMessage: resMessage(error.message)
					devMessage: error
				});
			}
		});
	}
});

exports.default = userApi;
//# sourceMappingURL=register.js.map