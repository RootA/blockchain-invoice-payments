/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { TransactionEntity } from '../../entity/transaction.entity';

export const create = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const {
		blockHash,
		blockNumber,
		contractAddress,
		cumulativeGasUsed,
		from,
		gasUsed,
		status,
		to,
		transactionHash,
		transactionIndex,
	} = req.body;

	try {
		const txnRepository = getRepository(TransactionEntity);
		const newTxn = new TransactionEntity();

		newTxn.blockHash = blockHash;
		newTxn.blockNumber = blockNumber;
		newTxn.cumulativeGasUsed = cumulativeGasUsed;
		newTxn.from = from;
		newTxn.to = to;
		newTxn.gasUsed = gasUsed;
		newTxn.status = status;
		newTxn.transactionHash = transactionHash;
		newTxn.transactionIndex = transactionIndex;
		newTxn.contractAddress = contractAddress;

		txnRepository.save(newTxn);
		return res.status(201).json({
			message: 'Successfully saved',
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Could not save the transaction',
		});
	}
};
