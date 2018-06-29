import VacancyModel from '../models/vacancy';
import requireAuth from '../middleware/require-auth';
import express from 'express';
import vacancyModel from '../models/vacancy';
const router = express.Router();

router.get('/', ({query}, res) => {
	//VacancyModel.find({}, {auth_tokens: 0, refresh_tokens: 0}).
	const page = parseInt(query.page || 0);
    const perPage = parseInt(query.perPage || 20);
    const employer = query.employer; 
	VacancyModel.paginate(employer ? {employer} : {}, {offset: page * perPage , limit: perPage})
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

router.get('/:vacancyId', ({ params: { vacancyId } }, req) => {
	VacancyModel.findById(vacancyId)
		.then(result => res.send({
			status: 0,
			message: "",
			devMessage: "",
			data: result,
		}))
		.catch(error => res.json({
			status: -1,
			message: "",
			devMessage: "Vacancy not found",
		}))
});

router.post('/', requireAuth, ({body, user}, res) => {
	if(user.type == "company"){
		const vacancy = new vacancyModel({name: body.name, avatar: body.avatar, description: body.description, employerId: user._id, requiredSkills: body.requiredSkills});
		vacancy.save()			
			.then( () => {
				res.json({
					status: 0,
					message: 'Vacancy successfull created',
					data: vacancy,
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

router.put('/:vacancyId', requireAuth, ({ params: { vacancyId }, body, user }, res) => {
	let updates = {name: body.name, avatar: body.avatar, birthDate: body.birthDate, description: body.description, skills: body.skills, phoneNumper: body.phoneNumper};

    VacancyModel.update({_id: vacancyId, employer: user._id}, body)
        .then((result) => res.json({
            status: 0,
            message: "",
            devMessage: result,
        }))
        .catch((err) => res.json({
            status: -1,
            message: "",
            devMessage: err.toString,
        }));
})

router.delete('/:vacancyId', requireAuth, ({ params: { vacancyId }, body, company }, res) => {
	if(vacancyId == vacancy._id){
		VacancyModel.findByIdAndRemove(vacancyId)
			.then(() => res.json({
				status: 0,
				message: "",
				devMessage: "Vacancy successfuly deleted",
			}))
			.catch((err) => res.json({
				status: -1,
				message: "",
				devMessage: err.toString,
			}));
	} else {
		res.json({
			status: -1,
			message: "",
			devMessage: "You don't have permissions to do it",
		})
	}
})

export default router;

