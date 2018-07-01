import ExcursionModel from '../models/excursion';
import requireAuth from '../middleware/require-auth';
import express from 'express';
import excursionModel from '../models/excursion';
const router = express.Router();

router.get('/', ({query}, res) => {
	//ExcursionModel.find({}, {auth_tokens: 0, refresh_tokens: 0}).
	const page = parseInt(query.page || 0);
    const perPage = parseInt(query.perPage || 20);
    const owner = query.owner; 
	ExcursionModel.paginate(owner ? {owner} : {}, {offset: page * perPage , limit: perPage})
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

router.get('/:excursionId', ({ params: { excursionId } }, res) => {
	ExcursionModel.findById(excursionId)
		.then(result => res.json({
			status: 0,
			message: "",
			devMessage: "",
			data: result,
		}))
		.catch(error => res.json({
			status: -1,
			message: "",
			devMessage: "Excursion not found",
		}))
});

router.post('/', requireAuth, ({body, user}, res) => {
	if(user.type == "company"){
		const excursion = new excursionModel({name: body.name, photo: body.photo, description: body.description, ownerId: user._id, location:{placeId: body.placeId, formattedAddress: body.formattedAddress || "City name"}, date: body.date});
		excursion.save()			
			.then( () => {
				res.json({
					status: 0,
					message: 'Excursion successfull created',
					data: excursion,
				})
			})
			.catch(error => {
				res.json({
					status: error.code || -1,
					message: "",
					//devMessage: resMessage(error.message)
					devMessage: error,
				})
			})
	} else {
		res.json({
			status: 7,
			message: "",
			devMessage: "You don't have permissions to do it",
		})
	}
});

router.put('/:excursionId', requireAuth, ({ params: { excursionId }, body, user }, res) => {
	// let updates = {name: body.name, avatar: body.avatar, birthDate: body.birthDate, description: body.description, skills: body.skills, phoneNumper: body.phoneNumper};
	// let update = {name: body.name};
	ExcursionModel.findOneAndUpdate({_id: excursionId, ownerId: user._id}, {name: body.name, photo: body.photo, description: body.description, ownerId: user._id, location:{placeId: body.placeId, formattedAddress: body.formattedAddress || "City name"}, date: body.date}, {new: true}).then( doc => {
		if(doc == null){
			res.json({
				status: -1,
				message: "",
				devMessage: "Invalid excursion id or you do not have permissions",
				data: doc
			})
		} else {
			res.json({
				status: 0,
				message: "",
				devMessage: "Excursion successfull update",
				data: doc
			})
		}
	}).catch( error => {
		res.json({
			status: -1,
			message: "",
			devMessage: error,
		})
	});
})

router.delete('/:excursionId', requireAuth, ({ params: { excursionId }, user }, res) => {
//	if(excursionId == excursion._id){
		//ExcursionModel.findByIdAndRemove(excursionId)
		ExcursionModel.findOneAndRemove({_id: excursionId, ownerId: user._id})
            .then((result) => {
                if(result == null){
                    res.json({
                        status: 0,
                        message: "",
                        devMessage: "Invalid excursion id or you do not have permissions",
                    })
                } else {
                    res.json({
                        status: 0,
                        message: "",
                        devMessage: "Excursion successfuly deleted",
                    })
                }
            })
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

