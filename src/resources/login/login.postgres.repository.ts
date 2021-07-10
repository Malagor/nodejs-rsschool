import { getRepository } from 'typeorm';
import { AuthData } from './login.model';
import { User } from '../../entities/User';
import { QueryAnswers } from '../../types';

const get = async (
  login: string
): Promise<AuthData | QueryAnswers.FORBIDDEN> => {
  const user: AuthData | undefined = await getRepository(User).findOne(
    { login },
    {
      select: ['id', 'login', 'password'],
    }
  );
  if (!user) {
    return QueryAnswers.FORBIDDEN;
  }

  return user;
};

export { get };
