import express from 'express';
import * as controller from './controller';
import { config } from '../../config';
import jwt from 'express-jwt';

export const txnRouter = express.Router();

/** GET /api/transaction/new */
txnRouter.route('/new').post(jwt(config), controller.create);
