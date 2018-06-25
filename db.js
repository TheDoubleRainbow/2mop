import mongoose from 'mongoose';
import Promise from 'bluebird';
import { logger } from './lib/util';
import config from './config';

const env = process.env.NODE_ENV || 'development';

const options = {
};

export default callback => {
	mongoose.Promise = Promise;

	if (env === 'development') mongoose.set('debug', true);
	
	mongoose.connect(config.host)
		.then(() => {
			logger.info('Mongo connected!');

			callback(mongoose);
		})
		.catch(err => logger.error(err.toString()));
}
