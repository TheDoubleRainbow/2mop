'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

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

var _expressHistoryApiFallback = require('express-history-api-fallback');

var _expressHistoryApiFallback2 = _interopRequireDefault(_expressHistoryApiFallback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var root = _path2.default.join(__dirname, '..', 'client', 'dist');

app.server = _http2.default.createServer(app);

app.use(_express2.default.static(root));
//app.use(fallback('index.html', { root }))

app.use((0, _morgan2.default)('dev'));
//app.use(cors({ exposedHeaders: config.corsHeaders }));
app.use((0, _cors2.default)({ origin: "*" }));
app.use(_bodyParser2.default.json({ limit: _config2.default.bodyLimit }));

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