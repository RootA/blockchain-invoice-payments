/**
 * JWT config.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const config = {
	algorithms: ['HS256' as const],
	secret: process.env.SECRET_KEY,
	DB_CONNECTION_URL: process.env.DB_CONNECTION_URL,
};
