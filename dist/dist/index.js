'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _util = require('./lib/util');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _passport3 = require('./middleware/passport');

var _passport4 = _interopRequireDefault(_passport3);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

//import cors from 'cors';
var app = (0, _express2.default)();

app.server = _http2.default.createServer(app);

app.use((0, _morgan2.default)('dev'));
//app.use(cors({ exposedHeaders: config.corsHeaders }));
app.use(_bodyParser2.default.json({ limit: _config2.default.bodyLimit }));

app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'client', 'build')));
console.log(_path2.default.join(__dirname, '..', 'client', 'dist'));

(0, _db2.default)(function () {
	app.use(_passport2.default.initialize());

	(0, _passport4.default)(_passport2.default);

	app.use('/api', _api2.default);
	app.server.listen(process.env.PORT || _config2.default.port, function () {
		_util.logger.info('Started on port ' + app.server.address().port);
	});
});

exports.default = app;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map