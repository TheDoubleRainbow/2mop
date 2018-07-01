import CourseModel from '../models/course';
import ApplyModel from '../models/apply';
import requireAuth from '../middleware/require-auth';
import express from 'express';
//import courseModel from '../models/course';
const router = express.Router();

router.get('/', ({query}, res) => {
	//CourseModel.find({}, {auth_tokens: 0, refresh_tokens: 0}).
	const page = parseInt(query.page || 0);
    const perPage = parseInt(query.perPage || 20);
    const owner = query.owner; 
	CourseModel.paginate(owner ? {owner} : {}, {offset: page * perPage , limit: perPage})
        
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

router.get('/:courseId', ({ params: { courseId } }, res) => {
	CourseModel.findById(courseId)
		.then(result => res.json({
			status: 0,
			message: "",
			devMessage: "",
			data: result,
		}))
		.catch(error => res.json({
			status: -1,
			message: "",
			devMessage: "Course not found",
		}))
});

router.post('/', requireAuth, ({body, user}, res) => {
	if(user.type == "company"){
		const course = new CourseModel({name: body.name, photo: body.photo, description: body.description, ownerId: user._id, location: {placeId: body.placeId, formattedAddress: body.formattedAddress || 'City name'}, date: body.date});
		course.save()			
			.then( () => {
				res.json({
					status: 0,
					message: 'Course successfull created',
					data: course,
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
			status: 7,
			message: "",
			devMessage: "You don't have permissions to do it",
		})
	}
});

router.post('/:courseId/apply', requireAuth, ({ params: { courseId }, user }, res) => {
	if(user.type == "user"){
		ApplyModel.findOne({applyerId: user._id, eventId: courseId}).then( a => {
			if(a != null){
				res.json({
					status: -1,
					message: 'You are applyed already',
				})
			} else {
				const apply = new ApplyModel({applyerId: user._id, eventType: "course", eventId: courseId});
				apply.save()			
				.then( () => {
					res.json({
						status: 0,
						message: 'Apply successfull created',
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
			}
		});
	} else {
		res.json({
			status: 7,
			message: "",
			devMessage: "You don't have permissions to do it",
		})
	}
});

router.put('/:courseId', requireAuth, ({ params: { courseId }, body, user }, res) => {
	// let updates = {name: body.name, avatar: body.avatar, birthDate: body.birthDate, description: body.description, skills: body.skills, phoneNumper: body.phoneNumper};
	// let update = {name: body.name};
	CourseModel.findOneAndUpdate({_id: courseId, ownerId: user._id}, {name: body.name, photo: body.photo, description: body.description, ownerId: user._id, location: {placeId: body.placeId, formattedAddress: body.formattedAddress || 'City name'}, date: body.date}, {new: true}).then( doc => {
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

router.delete('/:courseId', requireAuth, ({ params: { courseId }, user }, res) => {
//	if(courseId == course._id){
		//CourseModel.findByIdAndRemove(courseId)
		CourseModel.findOneAndRemove({_id: courseId, ownerId: user._id})
        .then((result) => {
            if(result == null){
                res.json({
                    status: 0,
                    message: "",
                    devMessage: "Invalid course id or you do not have permissions",
                })
            } else {
                res.json({
                    status: 0,
                    message: "",
                    devMessage: "Course successfuly deleted",
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

