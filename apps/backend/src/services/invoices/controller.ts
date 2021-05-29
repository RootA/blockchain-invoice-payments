/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { InvoiceEntity, State } from '../../entity/invoice.entity';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const get = async (req: Request, res: Response, next: NextFunction) => {
	const invoiceRepository = getRepository(InvoiceEntity);
	return await invoiceRepository
		.find({})
		.then((invoices) => res.json(invoices))
		.catch(next);
};

export const patch = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const invoiceRepository = getRepository(InvoiceEntity);
	const invoice = await invoiceRepository.findOne(req.params.invoiceId);
	const state = req.body.state;

	if (invoice) {
		if (state.toLowerCase() === State.Transacting.toLowerCase()) {
			invoice.status = State.Transacting;
		}
		if (state.toLowerCase() === State.Paid.toLowerCase()) {
			invoice.status = State.Paid;
		}
		if (state.toLowerCase() === State.Failed.toLowerCase()) {
			invoice.status = State.Failed;
		}
		invoiceRepository.save(invoice);
		res.status(200).json({
			message: 'Successfully updated',
		});
	}
	res.status(404).json({
		message: 'Cannot find the invoice',
	});
};
