import jwt from 'jsonwebtoken';
import { Request } from 'express';

import { env } from '../common/config';

const { JWT_SECRET_KEY } = env;

export const verifyAuth = (req: Request): boolean => {
  const sessionToken = req.headers.authorization;

  if (!sessionToken) return false;

  const [type, token] = sessionToken.split(' ');

  if (type !== 'Bearer') return false;

  if (token && JWT_SECRET_KEY) {
    // jwt.verify(token, JWT_SECRET_KEY, async (_, decoded) => {
    //   console.log('decoded', !!decoded);
    //   return !!decoded;
    // });
    jwt.verify(token, JWT_SECRET_KEY, (_, decoded) => {
      return !!decoded;
    });
  }
  return false;
};
