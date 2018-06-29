import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import mongoosePaginate from 'mongoose-paginate'

export const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  createdAt: { type: Date, default: new Date() },
  avatar: { type: String, default: "" },
  birthDate: { type: Date, default: "" },
  description: { type: String, default: "" },
  skills: { type: [String], default: [] },
  phoneNumber: { type: String, default: "" },
  authTokens: { type: [String], default: [], select: false},
  refreshTokens: { type: [String], default: [], select: false},
//  type: { type: String, required: true },
});

userSchema.plugin(mongoosePaginate);

userSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
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

userSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    
    return cb(null, isMatch);
  });
};

const userModel = mongoose.model('User', userSchema);

export default userModel;