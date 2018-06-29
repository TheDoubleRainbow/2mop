import { isEmpty } from 'lodash/fp';
import resource from 'resource-router-middleware';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import config from '../config';

const authApi = resource({
	create({ body: { email, password } }, res) {
    let promiseArray = []
    promiseArray.push(new Promise((resolve, reject) => {
      UserModel.findOne({ email }).select({password: 1, authTokens: 1, refreshTokens: 1}).then(result => {
        resolve(result);
      })
    }));
    promiseArray.push(new Promise((resolve, reject) => {
      CompanyModel.findOne({ email }).select({password: 1, authTokens: 1, refreshTokens: 1}).then(result => {
        resolve(result);
      })
    }))
      
    //promiseArray.push(CompanyModel.findOne({ email }).select("+password"));
    Promise.all(promiseArray)
      .then(result => {
        if (isEmpty(result[0]) && isEmpty(result[1])) {
          return res.send({
            status: 3,
            message: 'Authentication failed. User not found.'
          })
        }

        let userType = "";

        if (!isEmpty(result[0])) {
          result = result[0];
          userType = "user";
        }

        if (!isEmpty(result[1])) {
          result = result[1];
          userType = "company";
        }

        console.log('result ', result)

        result.comparePassword(password, (err, isMatch) => {
          if (isMatch && !err) {
            var authToken = "bearer " + jwt.sign({ sub: result._id, type: 'auth', userType }, config.jwtSecret, {
              expiresIn: config.authTokenExpiresIn
            });

            var refreshToken = jwt.sign({ sub: result._id, type: 'refresh', userType }, config.jwtSecret, {
              expiresIn: config.refreshTokenExpiresIn
            });

            result.authTokens.push(authToken);
            result.refreshTokens.push(refreshToken);
            return result.save((err)=>{
              if(err){
                res.json({success: false, message: err.toString});
              } else {
                res.json({
                  success: true,
                  message: 'Authentication successfull',
                  data: {
                    userType,
                    authToken,
                    expiresIn: config.authTokenExpiresIn,
                    refreshToken,
                  }

                });
              }
            })
          }

          res.status(401).send({
            success: false,
            message: 'Authentication failed. Passwords did not match.'
          });
        });
      })
      .catch(err => res.send(err.toString()))
  },
  delete() {

  }
});

export default authApi;
