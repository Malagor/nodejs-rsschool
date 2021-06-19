import { ConnectionOptions } from 'typeorm';
import { env } from './config';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = env;

export const config: ConnectionOptions = {
  type: 'postgres',
  name: 'my-little-connection',
  synchronize: true,
  host: POSTGRES_HOST,
  port: +`${POSTGRES_PORT}`,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
};
