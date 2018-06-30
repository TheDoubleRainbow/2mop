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

var vacancySchema = new _mongoose2.default.Schema({
  name: { type: String, required: true },
  created_at: { type: Number, default: Math.floor(Date.now() / 1000) },
  avatar: { type: String, default: "" },
  description: { type: String, default: "" },
  ownerId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  requiredSkills: { type: [String], default: [] }
}, {
  versionKey: false
});

vacancySchema.plugin(_mongoosePaginate2.default);

var vacancyModel = _mongoose2.default.model('Vacancy', vacancySchema);

exports.default = vacancyModel;
//# sourceMappingURL=vacancy.js.map