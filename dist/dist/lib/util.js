'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _process$env = process.env,
    NODE_ENV = _process$env.NODE_ENV,
    LOG_LEVEL = _process$env.LOG_LEVEL;

var DEV = NODE_ENV !== 'production';
var TEST = NODE_ENV === 'test';
var level = LOG_LEVEL || (TEST ? 'test' : 'info');

var logger = exports.logger = _winston2.default.createLogger({
  transports: [new _winston2.default.transports.Console({
    level: level,
    colorize: DEV
  })]
});
//# sourceMappingURL=util.js.map
//# sourceMappingURL=util.js.map