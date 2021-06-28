import { ConnectionOptions } from 'typeorm';
import { env } from './config';
import { User } from '../entities/User';
import { Board } from '../entities/Board';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = env;

const config: ConnectionOptions = {
  type: 'postgres',
  synchronize: true,
  host: POSTGRES_HOST,
  port: +`${POSTGRES_PORT}`,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [User, Board],
  // entities: ['src/entities/*.{ts,js}'],
  logging: false,
  dropSchema: false,
  migrations: ['./src/migration/**/*.{ts,js}'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default config;
