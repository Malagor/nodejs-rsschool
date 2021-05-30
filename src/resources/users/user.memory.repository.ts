import { memoryDb } from '../../memoryDb/memoryDb.js';
import { IUser } from '../../types.js';

const { users } = memoryDb;

const getAll = async (): Promise<IUser[]> => [...users];

const get = async (id: string): Promise<IUser | undefined> =>
  users.find((user) => user.id === id);

const create = async (user: IUser): Promise<IUser | undefined> => {
  users.push(user);
  return get(user.id);
};

const update = async (
  id: string,
  userData: IUser
): Promise<IUser | null | undefined> => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...userData, id };
    return get(id);
  }
  return null;
};

const remove = async (userId: string): Promise<boolean> => {
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) return false;

  return !!users.splice(index, 1).length;
};

export { getAll, get, create, update, remove };
