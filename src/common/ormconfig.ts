import { ConnectionOptions } from 'typeorm';
import { env } from './config';
import { User } from '../resources/users/user.entity';
import { Board } from '../resources/boards/board.entity';
import { Task } from '../resources/tasks/task.entity';

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
  // entities: ['./src/resources/**/*.entity.ts'],
  entities: [User, Board, Task],
  logging: false,
  dropSchema: false,
  migrations: ['./src/migration/**/*.{ts,js}'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default config;
