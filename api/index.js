import { Router } from 'express';
import { version } from '../../package.json';
import requireAuth from '../middleware/require-auth';
import authApi from './auth';
import userApi from './user';
import tokenApi from './token';
import registerApi from './register';

const api = Router();

api.use('/auth', authApi);
api.use('/user', requireAuth, userApi);
api.use('/register', registerApi);
api.use('/token', tokenApi);

api.get('/', (req, res) => {
	res.json({ version });
});

export default api;
