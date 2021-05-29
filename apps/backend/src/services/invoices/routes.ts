import express from 'express';
import * as controller from './controller';
import { config } from '../../config';
import jwt from 'express-jwt';

export const invoiceRouter = express.Router();

/** GET /api/invoices */
invoiceRouter.route('/').get(jwt(config), controller.get);

invoiceRouter.route('/:invoiceId').post(jwt(config), controller.patch);
