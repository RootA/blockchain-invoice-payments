import mongoose from 'mongoose';
import { config } from './config';

module.exports = function () {
	mongoose.set('useCreateIndex', true);
	mongoose.set('useFindAndModify', false);

	const dbUrl = config.DB_CONNECTION_URL;

	mongoose
		.connect(`${dbUrl}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('Database connection successful');
		})
		.catch((error) => {
			console.log(`An error occurred => ${error}`);
		});

	mongoose.connection.on('error', (error) => {
		console.log(`An error occurred => ${error}`);
	});

	mongoose.connection.on('disconnected', () => {
		console.log('debug', 'Database connection has been disconnected');
	});

	process.on('SIGINT', () => {
		mongoose.connection.close(() => {
			console.log(
				'debug',
				'connection drop due to application termination'
			);
			process.exit(0);
		});
	});
};
