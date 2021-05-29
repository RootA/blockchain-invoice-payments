import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

export interface InvoiceModelI {
	amount: number;
	invoiceNumber: string;
	coin: string;
	invoiceTo: string;
	invoiceFrom: string;
	status: string;
}

export enum State {
	UnPaid = 'UnPaid',
	Transacting = 'Transacting',
	Paid = 'Paid',
	Failed = 'Failed',
}

@Entity()
export class InvoiceEntity {
	@ObjectIdColumn()
	id!: ObjectID;

	@Column({
		default: Math.floor(Math.random() * 1000000),
		nullable: false,
	})
	amount!: number;

	@Column({
		default: `INV${Math.floor(Math.random() * 1000000)}`,
		nullable: false,
		unique: true,
	})
	invoiceNumber!: string;

	@Column({
		default: 'ETH',
		nullable: false,
	})
	coin!: string;

	@Column({
		nullable: false,
	})
	invoiceTo!: string;

	@Column({
		nullable: false,
	})
	invoiceFrom!: string;

	@Column({
		type: 'enum',
		enum: State,
		default: State.UnPaid,
	})
	status!: State;
}
