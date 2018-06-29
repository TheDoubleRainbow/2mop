import resource from 'resource-router-middleware';
import { merge, get, isEmpty } from 'lodash/fp';
import resMessage from '../lib/res-message';
import CompanyModel from '../models/company';

const companyApi = resource({
	id: 'companyId',

	index({ params }, res) {
		CompanyModel.find()
			.then(result => res.send(result))
			.catch(error => res.status(400).send(error))
	},

	read({ params: { companyId } }, res) {
		CompanyModel.findById(companyId)
			.then(result => res.send(result))
			.catch(() => res.status(404).send(resMessage('Company not found.')))
	},

	update({ params: { companyId }, body }, res) {
		CompanyModel.findByIdAndUpdate(companyId, body)
			.then(() => CompanyModel.findById(companyId).then(result => res.send(result)))
			.catch(() => res.status(404).send(resMessage('Company not found.')))
	},

	delete({ params: { companyId } }, res) {
		CompanyModel.findByIdAndRemove(companyId)
			.then(() => res.send(resMessage('Company successfully deleted!')))
			.catch(() => res.status(404).send(resMessage('Company not found.')))
	}
});

export default companyApi;
