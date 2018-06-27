import resource from 'resource-router-middleware';
import resMessage from '../lib/res-message';
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import jwt from 'jsonwebtoken';
import config from '../config';

// const addFullNameToBody = body => merge({
// 	name: {
// 		full: `${get('name.first', body)} ${get('name.last', body)}`
// 	},
// }, body);

const userApi = resource({
	create({ body }, res) {
		//let user = new UserModel(addFullNameToBody(body));
		console.log(CompanyModel.schema);
		let user = null;

		switch(body.type){
			case 'user': 
				user = new UserModel(body);
				break;
			case 'company':
				user = new CompanyModel(body);
				break;
			default:
				res.json({
					status: -1,
					message: "",
					devMessage: "Invalid or missing type"
				});
				res.end();
		}
		var authToken = "bearer " + jwt.sign({ sub: user._id, type: 'auth', userType: body.type }, config.jwtSecret, {
		expiresIn: config.authTokenExpiresIn
		});

		var refreshToken = jwt.sign({ sub: user._id, type: 'refresh', userType: body.type }, config.jwtSecret, {
		expiresIn: config.refreshTokenExpiresIn
		});

		user.auth_tokens.push(authToken);
		user.refresh_tokens.push(refreshToken);

		user.save()
			.then( () => {
				res.json({
					status: 0,
					message: 'Registration successfull',
					data: {
						authToken,
						expiresIn: config.authTokenExpiresIn,
						refreshToken
					}
				})
			})
			.catch(error => {
				let message = "Registration failture";
				if(error.code == 11000) message = "User with such email is exists";
				res.json({
					status: error.code || -1,
					message,
					//devMessage: resMessage(error.message)
					devMessage: error.message,
				})
			})
	},
});

export default userApi;
