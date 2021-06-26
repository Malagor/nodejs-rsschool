import jwt from 'jsonwebtoken';
import { env } from '../common/config';

const { JWT_SECRET_KEY, EXPIRES_TIME_SEC } = env;

export const generateAccessToken = (id: string, login: string): string => {
  const payload = {
    id,
    login,
  };

  return jwt.sign(payload, JWT_SECRET_KEY || 'secret_key', {
    expiresIn: EXPIRES_TIME_SEC || '24h',
  });
};
