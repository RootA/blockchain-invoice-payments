import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

//database connection and settings
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./db')();

const port = process.env.PORT || 8000;

app.listen(port, () =>
	console.log(`Express app listening on localhost:${port}`)
);
