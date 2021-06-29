import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

// import { StatusCode } from 'http-status-codes';
import { HttpStatus } from '@nestjs/common';
import { env } from '../common/config';
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
      next(new CustomError(HttpStatus.UNAUTHORIZED, `No token provided.`));
      return;
    }

    const [type, token] = sessionToken.split(' ');

    if (type !== 'Bearer') {
      next(
        new CustomError(
          HttpStatus.UNAUTHORIZED,
          'Header in the request is absent or invalid or does not follow "Bearer" scheme'
        )
      );
      return;
    }
    if (token && JWT_SECRET_KEY) {
      jwt.verify(token, JWT_SECRET_KEY, async (_, decoded) => {
        if (decoded) {
          next();
        } else {
          res.status(HttpStatus.UNAUTHORIZED).send({ error: 'Not authorized' });
        }
      });
    }
    res.status(HttpStatus.UNAUTHORIZED).send({ error: 'Not authorized' });
  }
};
