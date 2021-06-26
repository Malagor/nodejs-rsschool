import * as usersRepo from './user.postgres.repository';
// import * as tasksService from '../tasks/tasks.service';
import { QueryAnswers } from '../../types';
import { User } from '../../entities/User';

const getAll = (): Promise<User[]> => usersRepo.getAll();

const get = (id: string): Promise<User | QueryAnswers.NOT_FOUND> =>
  usersRepo.get(id);

const create = (user: User): Promise<User | QueryAnswers.NOT_FOUND> =>
  usersRepo.create(user);

const update = (
  id: string,
  userData: Partial<User>
): Promise<User | QueryAnswers.NOT_FOUND> => usersRepo.update(id, userData);

const remove = (id: string): Promise<QueryAnswers> => usersRepo.remove(id);

export { getAll, create, get, update, remove };
