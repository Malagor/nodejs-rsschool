import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  SALT,
  AUTH_MODE,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  TIME_ZONE,
  EXPIRES_TIME_SEC,
} = process.env;

export const env = {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  SALT,
  AUTH_MODE: AUTH_MODE === 'true',
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  TIME_ZONE,
  EXPIRES_TIME_SEC,
};
