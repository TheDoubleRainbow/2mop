import HakatonModel from '../models/hakaton';
import requireAuth from '../middleware/require-auth';
import express from 'express';
import hakatonModel from '../models/hakaton';
const router = express.Router();

router.get('/', ({query}, res) => {
	//HakatonModel.find({}, {auth_tokens: 0, refresh_tokens: 0}).
	const page = parseInt(query.page || 0);
    const perPage = parseInt(query.perPage || 20);
    const organizer = query.organizer; 
	HakatonModel.paginate(organizer ? {organizer} : {}, {offset: page * perPage , limit: perPage})
		.then(result => res.json({
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
			devMessage: error,
		}))
});

router.get('/:hakatonId', ({ params: { hakatonId } }, res) => {
	HakatonModel.findById(hakatonId)
		.then(result => res.json({
			status: 0,
			message: "",
			devMessage: "",
			data: result,
		}))
		.catch(error => res.json({
			status: -1,
			message: "",
			devMessage: "Hakaton not found",
		}))
});

router.post('/', requireAuth, ({body, user}, res) => {
	if(user.type == "company"){
		const hakaton = new hakatonModel({name: body.name, avatar: body.avatar, description: body.description, organizerId: user._id, requiredSkills: body.requiredSkills});
		hakaton.save()			
			.then( () => {
				res.json({
					status: 0,
					message: 'Hakaton successfull created',
					data: hakaton,
				})
			})
			.catch(error => {
				res.json({
					status: error.code || -1,
					message: "",
					//devMessage: resMessage(error.message)
					devMessage: error.message,
				})
			})
	} else {
		res.json({
			status: -1,
			message: "",
			devMessage: "You don't have permissions to do it",
		})
	}
});

router.put('/:hakatonId', requireAuth, ({ params: { hakatonId }, body, user }, res) => {
	// let updates = {name: body.name, avatar: body.avatar, birthDate: body.birthDate, description: body.description, skills: body.skills, phoneNumper: body.phoneNumper};
	// let update = {name: body.name};
	HakatonModel.findOneAndUpdate({_id: hakatonId, organizerId: user._id}, body, {new: true}).then( doc => {
		res.json({
			status: 0,
			message: "",
			devMessage: "Vacation successfull update",
			data: doc
		})
	}).catch( error => {
		res.json({
			status: -1,
			message: "",
			devMessage: error,
		})
	});
})

router.delete('/:hakatonId', requireAuth, ({ params: { hakatonId }, user }, res) => {
//	if(hakatonId == hakaton._id){
		//HakatonModel.findByIdAndRemove(hakatonId)
		HakatonModel.findOneAndRemove({_id: hakatonId, organizerId: user._id})
			.then(() => res.json({
				status: 0,
				message: "",
				devMessage: "Hakaton successfuly deleted",
			}))
			.catch((err) => res.json({
				status: -1,
				message: "",
				devMessage: err,
			}));
	// } else {
	// 	res.json({
	// 		status: -1,
	// 		message: "",
	// 		devMessage: "You don't have permissions to do it",
	// 	})
	// }
})

export default router;

