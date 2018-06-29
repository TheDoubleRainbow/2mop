'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var companySchema = new _mongoose2.default.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  createdAt: { type: Date, default: new Date() },
  avatar: { type: String, default: "" },
  description: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  webSite: { type: String, default: "" },
  location: { type: String, required: true },
  authTokens: { type: [String], default: [], select: false },
  refreshTokens: { type: [String], default: [], select: false }
  //type: { type: String, required: true },
});

companySchema.plugin(_mongoosePaginate2.default);

companySchema.pre('save', function (next) {
  var company = this;
  if (this.isModified('password') || this.isNew) {
    _bcrypt2.default.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      _bcrypt2.default.hash(company.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        company.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

companySchema.methods.comparePassword = function (pw, cb) {
  _bcrypt2.default.compare(pw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }

    return cb(null, isMatch);
  });
};

var companyModel = _mongoose2.default.model('Company', companySchema);

exports.default = companyModel;
//# sourceMappingURL=company.js.map