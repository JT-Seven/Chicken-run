import * as mongoose from 'mongoose';
import logger from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

export function DataBaseConnection() {
	const uri = process.env.URI_DATABASE;

	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: 'chicken',
	};

	mongoose.connect(uri, options)
		.then(() => logger.info('Database connection established'))
		.catch((error) => {
			logger.error('Database connection error');
			logger.error(error);
		});
}
