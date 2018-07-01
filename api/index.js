import { Router } from 'express';
import { version } from '../../package.json';
//import requireAuth from '../middleware/require-auth';
import authApi from './auth';
import logoutApi from './logout';
import userApi from './user';
import companyApi from './company';
import tokenApi from './token';
import registerApi from './register';
import vacancyApi from './vacancy';
import excursionApi from './excursion';
import hakatonApi from './hakaton';
import courseApi from './course';
//import cors from 'cors';

const api = Router();

api.use('/auth', authApi);
api.use('/logout', logoutApi);
api.use('/user', userApi);
api.use('/company', companyApi);
api.use('/register', registerApi);
api.use('/token', tokenApi);

api.use('/vacancy', vacancyApi);
api.use('/excursion', excursionApi);
api.use('/hakaton', hakatonApi);
api.use('/course', courseApi);

api.get('/', (req, res) => {
	res.json({ version });
});

export default api;
