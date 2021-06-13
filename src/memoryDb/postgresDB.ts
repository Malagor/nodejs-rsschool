import { Sequelize } from 'sequelize';
import { env } from '../common/config';

const {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_HOST,
  TIME_ZONE,
} = env;

const sequelize = new Sequelize(
  `${POSTGRES_DB}`,
  `${POSTGRES_USER}`,
  `${POSTGRES_PASSWORD}`,
  {
    host: POSTGRES_HOST,
    dialect: 'postgres',
    port: +`${POSTGRES_PORT}`,
    timezone: TIME_ZONE,
  }
);

sequelize
  .authenticate()
  .then(() => {
    process.stdout.write('DB connecting\n');
  })
  .catch((err) => {
    process.stderr.write(`ERROR DB connecting\n${err}\n`);
  });

export = sequelize;
