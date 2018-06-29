import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  created_at: { type: Date, default: new Date() },
  avatar: { type: String, default: "" },
  description: { type: String, default: "" },
  phone_number: { type: String, default: "" },
  location: { type: String, required: true},
  auth_tokens: { type: Array, default: [] },
  refresh_tokens: { type: Array, default: [] },
  //type: { type: String, required: true },
});

companySchema.pre('save', function(next) {
  var company = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(company.password, salt, function(err, hash) {
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

companySchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    
    return cb(null, isMatch);
  });
};

const companyModel = mongoose.model('Company', companySchema);

export default companyModel;