import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

export interface UserModelI {
	nonce: number;
	publicAddress: string;
	username?: string;
}

@Entity()
export class UserEntity {
	@ObjectIdColumn()
	id!: ObjectID;

	@Column({
		default: Math.floor(Math.random() * 1000000),
		nullable: false,
	})
	nonce!: number;

	@Column({
		unique: true,
		nullable: false,
	})
	publicAddress!: string;

	@Column({
		nullable: true,
		unique: true,
	})
	username?: string;
}
