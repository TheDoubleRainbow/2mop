import resource from 'resource-router-middleware';
import { merge, get, isEmpty } from 'lodash/fp';
import resMessage from '../lib/res-message';
import CompanyModel from '../models/company';
import requireAuth from '../middleware/require-auth';
import express from 'express';
const router = express.Router();

router.get('/', requireAuth, ({query}, res) => {
	//CompanyModel.find({}, {auth_tokens: 0, refresh_tokens: 0}).
	const page = parseInt(query.page || 0);
	const perPage = parseInt(query.perPage || 20);
	CompanyModel.paginate({}, {offset: page * perPage , limit: perPage})
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

router.get('/:companyId', ({ params: { companyId } }, res) => {
	CompanyModel.findById(companyId)
		.then(result => res.send({
			status: 0,
			message: "",
			devMessage: "",
			data: result,
		}))
		.catch(error => res.json({
			status: 8,
			message: "",
			devMessage: "Company not found",
		}))
});

router.put('/:companyId', requireAuth, ({ params: { companyId }, body, company }, res) => {
	if(companyId == company._id){
		CompanyModel.findByIdAndUpdate(companyId, {name: body.name, avatar: body.avatar, webSite: body.webSite, description: body.description, phoneNumper: body.phoneNumper, location: body.location})
			.then(() => res.json({
				status: 0,
				message: "",
				devMessage: "Company data update success",
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

router.delete('/:companyId', requireAuth, ({ params: { companyId }, body, company }, res) => {
	if(companyId == company._id){
		CompanyModel.findByIdAndRemove(companyId)
			.then(() => res.json({
				status: 0,
				message: "",
				devMessage: "Company successfuly deleted",
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
