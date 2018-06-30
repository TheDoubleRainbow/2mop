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
  created_at: { type: Number, default: Math.floor( Date.now() / 1000) },
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
  portfolio: {type: [{name: {type: String}, url: {type: String}}], default: []},
  phoneNumber: { type: String, default: "" },
  location: {
    cityId: { type: String, default: []},
    formattedAddress: { type: String, default: []}
  },
  emailVerified: { type: Boolean, default: false},
  authTokens: { type: [String], default: [], select: false},
  refreshTokens: { type: [String], default: [], select: false},
//  type: { type: String, required: true },
}, {
  versionKey: false 
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