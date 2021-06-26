import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

import { getRepository } from 'typeorm';
import { UNAUTHORIZED, NOT_FOUND } from 'http-status-codes';
import { env } from '../common/config';
import { User } from '../entities/User';
import { CustomError } from './errorHandler';

const { JWT_SECRET_KEY } = env;

export const verifyAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.method === 'OPTIONS') {
    next(); // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;

    if (!sessionToken) {
      next(new CustomError(UNAUTHORIZED, `No token provided.`));
      return;
    }

    const token: string = sessionToken.split(' ')[1] || '';

    jwt.verify(token, JWT_SECRET_KEY || 'secret_key', async (_, decoded) => {
      if (decoded) {
        const user = await getRepository(User).findOne({
          id: decoded['id'],
          login: decoded['login'],
        });

        if (!user) {
          next(new CustomError(UNAUTHORIZED, 'Not authorized1'));
          return;
        }

        next();
      } else {
        res.status(NOT_FOUND).send({ error: 'Not authorized2' });
      }
    });
  }
};
