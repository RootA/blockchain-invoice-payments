module.exports = {
	type: 'mongodb',
	url: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/defi',
	synchronize: false,
	logging: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	entities: ['src/entity/*{.ts,.js}'],
	migrations: ['src/migration/*{.ts,.js}'],
	subscribers: ['src/subscriber/*.js'],
	factories: ['src/factories/*{.ts,.js}'],
	seeds: ['src/seeds/*{.ts,.js}'],
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};
