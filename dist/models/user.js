'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = exports.userSchema = new _mongoose2.default.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  created_at: { type: Number, default: Math.floor(Date.now() / 1000) },
  avatar: { type: String, default: "" },
  birthDate: { type: Number, default: null },
  description: { type: String, default: "" },
  skills: { type: {
      type: [{
        key: { type: String },
        val: { type: String }
      }],
      default: []
    }, default: [] },
  portfolio: { type: [{ name: { type: String }, url: { type: String } }], default: [] },
  phoneNumber: { type: String, default: "" },
  location: {
    cityId: { type: String, default: [] },
    formattedAddress: { type: String, default: [] }
  },
  emailVerified: { type: Boolean, default: false },
  authTokens: { type: [String], default: [], select: false },
  refreshTokens: { type: [String], default: [], select: false }
  //  type: { type: String, required: true },
}, {
  versionKey: false
});

userSchema.plugin(_mongoosePaginate2.default);

userSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    _bcrypt2.default.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      _bcrypt2.default.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (pw, cb) {
  _bcrypt2.default.compare(pw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }

    return cb(null, isMatch);
  });
};

var userModel = _mongoose2.default.model('User', userSchema);

exports.default = userModel;
//# sourceMappingURL=user.js.map