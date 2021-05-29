import express from 'express';

import { authRouter } from './auth';
import { userRouter } from './users';
import { invoiceRouter } from './invoices';
import { txnRouter } from './transactions';

export const services = express.Router();

services.use('/auth', authRouter);
services.use('/users', userRouter);
services.use('/invoices', invoiceRouter);
services.use('/transactions', txnRouter);
