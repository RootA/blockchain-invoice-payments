import 'reflect-metadata';
import { createConnection } from 'typeorm';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import * as dotenv from 'dotenv';
import helmet from 'helmet';

import { services } from './services';
import { UserEntity } from './entity/user.entity';

dotenv.config();
createConnection({
	type: 'mongodb',
	url: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/defi',
	useUnifiedTopology: true,
	logging: true,
	entities: [UserEntity],
})
	// eslint-disable-next-line @typescript-eslint/require-await
	.then(async (connection) => {
		if (connection.isConnected) {
			console.log('Database connection successful');
			console.log('DB_URL =>', process.env.DB_CONNECTION_URL);
		}

		// create express app
		const app = express();

		// call the application middlewares
		app.use(cors());
		app.use(helmet());
		app.use(bodyParser.json());
		app.use(
			bodyParser.urlencoded({
				extended: true,
			})
		);

		// Set all routes from the routes folder
		// Mount REST on /api
		app.use('/api', services);

		const port = process.env.PORT || 8000;

		// start express server
		app.listen(port, () => {
			console.log(`Starting the Defi server on port ${port}`);
		});
	})
	.catch((error) => console.log('error => ', error));
