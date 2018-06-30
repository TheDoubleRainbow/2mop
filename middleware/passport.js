import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import Company from '../models/company';
import config from '../config';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

export default passport => passport.use(new Strategy(opts, (payload, done) => {
  if(payload.type !== "auth"){
    console.log(payload)
    return done(new Error("Invalid token"), null);
  }

  let Model = null;

  switch(payload.userType){
    case 'user': 
      Model =  User;
      break;
    case 'company':
      Model = Company;
      break;
    default: 
    console.log("user not found");
    return done(new Error("User not found."), null);
  }

  Model.findById(payload.sub)
    .then(user => {
      if (user) {
        user.type = payload.userType
        return done(null, user);
      }

      return done(new Error("User not found."), null);
    })
    .catch(err => done(err, false))
}));