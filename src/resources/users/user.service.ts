import * as usersRepo from './user.memory.repository';
import * as tasksService from '../tasks/tasks.service';
import { IUser, QueryAnswers } from '../../types';

const getAll = (): Promise<IUser[]> => usersRepo.getAll();

const get = (id: string): Promise<IUser | QueryAnswers.NOT_FOUND> =>
  usersRepo.get(id);

const create = (user: IUser): Promise<IUser | QueryAnswers.NOT_FOUND> =>
  usersRepo.create(user);

const update = (
  id: string,
  userData: IUser
): Promise<IUser | QueryAnswers.NOT_FOUND> => usersRepo.update(id, userData);

const remove = (id: string): Promise<QueryAnswers[]> =>
  Promise.all([usersRepo.remove(id), tasksService.deleteUserFromTask(id)]);

export { getAll, create, get, update, remove };
