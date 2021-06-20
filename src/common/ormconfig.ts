import { ConnectionOptions } from 'typeorm';
import { env } from './config';
// import { Task } from '../entities/Task';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = env;

export const config: ConnectionOptions = {
  // name: 'my-little-connection',
  type: 'postgres',
  synchronize: true,
  host: POSTGRES_HOST,
  port: +`${POSTGRES_PORT}`,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['src/entities/*.{ts,js}'],
  logging: false,
};
