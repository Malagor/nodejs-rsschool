import { Sequelize } from 'sequelize';
import { env } from '../common/config';

const {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_HOST,
} = env;

const sequelize = new Sequelize(
  `${POSTGRES_DB}`,
  `${POSTGRES_USER}`,
  `${POSTGRES_PASSWORD}`,
  {
    host: POSTGRES_HOST,
    dialect: 'postgres',
    port: +`${POSTGRES_PORT}`,
  }
);

sequelize
  .authenticate()
  .then(() => {
    process.stdout.write('DB connecting\n');
  })
  .catch((err) => {
    process.stderr.write('ERROR DB connecting\n', err);
  });

export = sequelize;
