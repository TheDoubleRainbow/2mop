'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var applySchema = new _mongoose2.default.Schema({
    applyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    eventType: { type: String, required: true },
    eventId: { type: String, required: true }
}, {
    versionKey: false
});

applySchema.plugin(_mongoosePaginate2.default);

var applyModel = _mongoose2.default.model('Apply', applySchema);

exports.default = applyModel;
//# sourceMappingURL=apply.js.map