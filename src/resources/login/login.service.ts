import * as loginRepo from './login.postgres.repository';
import { QueryAnswers } from '../../types';
import { AuthData } from './login.model';

export const get = (
  login: string
): Promise<AuthData | QueryAnswers.FORBIDDEN> => loginRepo.get(login);
