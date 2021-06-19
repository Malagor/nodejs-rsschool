import { createConnection } from 'typeorm';
import { config } from '../common/ormconfig';

export const connect = async (): Promise<void> => {
  const connection = await createConnection(config);
  await connection.runMigrations();
};
