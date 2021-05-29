import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

export interface TransactionModelI {
	blockHash: string;
	cumulativeGasUsed: number;
	from: string;
	to: string;
	gasUsed: number;
	status: boolean;
	transactionHash: string;
	transactionIndex: number;
	contractAddress?: string;
}

@Entity()
export class TransactionEntity {
	@ObjectIdColumn()
	id!: ObjectID;

	@Column()
	blockHash!: string;

	@Column()
	blockNumber!: number;

	@Column()
	cumulativeGasUsed!: number;

	@Column()
	from!: string;

	@Column()
	gasUsed!: number;

	@Column()
	status!: boolean;

	@Column()
	to!: string;

	@Column()
	transactionHash!: string;

	@Column()
	transactionIndex!: number;

	@Column({
		nullable: true,
	})
	contractAddress?: string;
}
