/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { InvoiceEntity } from '../entity/invoice.entity';
import { InoviceSeed } from '../seeds/invoice.seed';

export class invoiceCreation1622276556811 implements MigrationInterface {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public async up(queryRunner: QueryRunner): Promise<void> {
		await getRepository(InvoiceEntity).save(InoviceSeed);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public async down(queryRunner: QueryRunner): Promise<void> {}
}
