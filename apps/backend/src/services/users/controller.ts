import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { UserEntity } from '../../entity/user.entity';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const find = (req: Request, res: Response, next: NextFunction) => {
	// If a query string ?publicAddress=... is given, then filter results
	const whereClause =
		req.query && req.query.publicAddress
			? {
					where: { publicAddress: req.query.publicAddress },
			  }
			: undefined;
	const userRepository = getRepository(UserEntity);
	return userRepository
		.find(whereClause)
		.then((users: UserEntity[]) => res.json(users))
		.catch(next);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const get = (req: Request, res: Response, next: NextFunction) => {
	// AccessToken payload is in req.user.payload, especially its `id` field
	// UserId is the param in /users/:userId
	// We only allow user accessing herself, i.e. require payload.id==userId
	if ((req as any).user.payload.id !== req.params.userId) {
		return res
			.status(401)
			.send({ error: 'You can can only access yourself' });
	}
	const userRepository = getRepository(UserEntity);
	return userRepository
		.findOne(req.params.userId)
		.then((user) => res.json(user))
		.catch(next);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const create = (req: Request, res: Response, next: NextFunction) => {
	try {
		const userRepository = getRepository(UserEntity);
		const user = userRepository.save(req.body);
		return res.json(user);
	} catch (error) {
		console.error(error);
		next(error);
	}
	console.log('sdsd =>', req.body);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const patch = (req: Request, res: Response, next: NextFunction) => {
	// Only allow to fetch current user
	if ((req as any).user.payload.id !== req.params.userId) {
		return res
			.status(401)
			.send({ error: 'You can can only access yourself' });
	}
	const userRepository = getRepository(UserEntity);
	return userRepository
		.findOne(req.params.userId)
		.then((user) => {
			if (!user) {
				return user;
			}

			Object.assign(user, req.body);
			return userRepository.save(user);
		})
		.then((user) => {
			return user
				? res.json(user)
				: res.status(401).send({
						error: `User with publicAddress ${req.params.userId} is not found in database`,
				  });
		})
		.catch(next);
};
