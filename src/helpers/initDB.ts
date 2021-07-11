import { getConnection } from 'typeorm';
import { createHash } from './bcryptHash';
import { User } from '../resources/users/user.entity';

export const initDB = async (): Promise<void> => {
  try {
    const connection = getConnection();
    const firstUser = await connection
      .getRepository(User)
      .createQueryBuilder()
      .where({ login: 'admin' })
      .getOne();

    if (firstUser) {
      process.stdout.write('User ADMIN is created');
      return;
    }

    connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { name: 'admin', login: 'admin', password: createHash('admin') },
      ])
      .execute()
      .then(() => {
        process.stdout.write('User ADMIN created');
      })
      .catch(() => {
        process.stderr.write('Can not create "admin" user');
      });
  } catch (e) {
    process.stderr.write('Error get Connection for create ADMIN user', e);
  }
};
