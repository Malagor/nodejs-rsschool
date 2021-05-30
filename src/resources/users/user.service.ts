import * as usersRepo from './user.memory.repository';
import * as tasksService from '../tasks/tasks.service';
import { IUser } from '../../types';

const getAll = (): Promise<IUser[]> => usersRepo.getAll();

const get = (id: string): Promise<IUser | undefined> => usersRepo.get(id);

const create = (user: IUser): Promise<IUser | undefined> =>
  usersRepo.create(user);

const update = (
  id: string,
  userData: IUser
): Promise<IUser | null | undefined> => usersRepo.update(id, userData);

const remove = (id: string): Promise<[boolean, boolean]> =>
  Promise.all([usersRepo.remove(id), tasksService.deleteUserFromTask(id)]);

export { getAll, create, get, update, remove };
