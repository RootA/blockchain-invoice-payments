export default {
	type: 'mongodb',
	url: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/defi',
	synchronize: false,
	logging: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	entities: ['src/entity/**/*.js'],
	migrations: ['src/migration/**/*.js'],
	subscribers: ['src/subscriber/*.js'],
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};
