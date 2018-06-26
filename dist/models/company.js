'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import mongoose from 'mongoose';
// import UserModel, {userSchema} from '../models/user';
// import bcrypt from 'bcrypt';


// function extendSchema (Schema, definition, options) {
//     return new mongoose.Schema(
//       Object.assign({}, Schema.obj, definition),
//       options
//     );
// }

// const companySchema = extendSchema(userSchema, {
//     name: {type: String, required: true}
// });

// // companySchema.methods.comparePassword = function(pw, cb) {
// //     bcrypt.compare(pw, this.password, function(err, isMatch) {
// //       if (err) {
// //         return cb(err);
// //       }

// //       return cb(null, isMatch);
// //     });
// //   };

// const companyModel = mongoose.model('Company', companySchema);

// export default companyModel;

var companySchema = new _mongoose2.default.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  created_at: { type: Date, default: new Date() },
  avatar: { type: String, default: "" },
  birth_date: { type: Date, default: "" },
  description: { type: String, default: "" },
  phone_number: { type: String, default: "" },
  auth_tokens: { type: Array, default: [] },
  refresh_tokens: { type: Array, default: [] },
  type: { type: String, required: true }
});

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