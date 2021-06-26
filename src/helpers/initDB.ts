import { Connection } from 'typeorm';
import { createHash } from './bcryptHash';
import { User } from '../entities/User';

export const initDB = async (connection: Connection): Promise<void> => {
  connection
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([{ name: 'admin', login: 'admin', password: createHash('admin') }])
    .execute()
    .catch(() => {
      process.stderr.write('Can not create "admin" user');
    });
};
