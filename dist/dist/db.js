'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _util = require('./lib/util');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var env = process.env.NODE_ENV || 'development';

var options = {};

exports.default = function (callback) {
	_mongoose2.default.Promise = _bluebird2.default;

	if (env === 'development') _mongoose2.default.set('debug', true);

	_mongoose2.default.connect(_config2.default.host).then(function () {
		_util.logger.info('Mongo connected!');

		callback(_mongoose2.default);
	}).catch(function (err) {
		return _util.logger.error(err.toString());
	});
};
//# sourceMappingURL=db.js.map
//# sourceMappingURL=db.js.map