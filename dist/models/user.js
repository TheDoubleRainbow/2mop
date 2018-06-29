'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = exports.userSchema = new _mongoose2.default.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  created_at: { type: Date, default: new Date() },
  avatar: { type: String, default: "" },
  birth_date: { type: Date, default: "" },
  description: { type: String, default: "" },
  skills: { type: Array, default: [] },
  phone_number: { type: String, default: "" },
  auth_tokens: { type: Array, default: [] },
  refresh_tokens: { type: Array, default: [] }
  //  type: { type: String, required: true },
});

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