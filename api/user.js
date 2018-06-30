import resource from 'resource-router-middleware';
import { merge, get, isEmpty } from 'lodash/fp';
import resMessage from '../lib/res-message';
import UserModel from '../models/user';
import requireAuth from '../middleware/require-auth';
import express from 'express';
const router = express.Router();

router.get('/', ({query}, res) => {
	//UserModel.find({}, {auth_tokens: 0, refresh_tokens: 0}).
	const page = parseInt(query.page || 0);
	const perPage = parseInt(query.perPage || 20);
	UserModel.paginate({}, {offset: page * perPage , limit: perPage})
		.then(result => res.send({
			status: 0,
			message: "",
			devMessage: "",
			data: result.docs,
			metaData: {
				totalPages: result.total % perPage == 0 ? result.total / perPage : parseInt(result.total / perPage) + 1,
				perPage: perPage,
				currentPage: page		
			}
		}))
		.catch(error => res.json({
			status: -1,
			message: "",
			devMessage: error.toString(),
		}))
});

router.get('/:userId', ({ params: { userId } }, res) => {
	UserModel.findById(userId)
		.then(result => res.send({
			status: 0,
			message: "",
			devMessage: "",
			data: result,
		}))
		.catch(error => res.json({
			status: 6,
			message: "",
			devMessage: "User not found",
		}))
});

router.put('/:userId', requireAuth, ({ params: { userId }, body, user }, res) => {
	if(userId == user._id){
		UserModel.findByIdAndUpdate(userId, {name: body.name, avatar: body.avatar, birthDate: body.birthDate, description: body.description, skills: body.skills, phoneNumper: body.phoneNumper})
			.then(() => res.json({
				status: 0,
				message: "",
				devMessage: "User data update success",
			}))
			.catch((err) => res.json({
				status: -1,
				message: "",
				devMessage: err.toString,
			}));
	} else {
		res.json({
			status: 7,
			message: "",
			devMessage: "You don't have permissions",
		})
	}
})

router.delete('/:userId', requireAuth, ({ params: { userId }, body, user }, res) => {
	if(userId == user._id){
		UserModel.findByIdAndRemove(userId)
			.then(() => res.json({
				status: 0,
				message: "",
				devMessage: "User successfuly deleted",
			}))
			.catch((err) => res.json({
				status: -1,
				message: "",
				devMessage: err.toString,
			}));
	} else {
		res.json({
			status: 7,
			message: "",
			devMessage: "You don't have permissions to do it",
		})
	}
})

export default router;

// const userApi = resource({
// 	id: 'userId',

// 	index(req, res) {
// 		req.checkAuth();
// 		UserModel.find({}, {auth_tokens: 0, refresh_tokens: 0})
// 			.then(result => res.send(result))
// 			.catch(error => res.status(400).send(error))
// 	},

// 	read({ params: { userId } }, res) {
// 		UserModel.findById(userId)
// 			.then(result => res.send(result))
// 			.catch(() => res.status(404).send(resMessage('User not found.')))
// 	},

// 	update({ params: { userId }, body }, res) {
// 		UserModel.findByIdAndUpdate(userId, body)
// 			.then(() => UserModel.findById(userId).then(result => res.send(result)))
// 			.catch(() => res.status(404).send(resMessage('User not found.')))
// 	},

// 	delete({ params: { userId } }, res) {
// 		UserModel.findByIdAndRemove(userId)
// 			.then(() => res.send(resMessage('User successfully deleted!')))
// 			.catch(() => res.status(404).send(resMessage('User not found.')))
// 	}
// });

// export default userApi;
