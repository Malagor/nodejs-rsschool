import { memoryDb } from '../../memoryDb/memoryDb';
import { IUser, QueryAnswers } from '../../types';

const { users } = memoryDb;

const getAll = async (): Promise<IUser[]> => [...users];

const get = async (id: string): Promise<IUser | QueryAnswers.NOT_FOUND> => {
  const user = users.find((u) => u.id === id);
  if (user === undefined) return QueryAnswers.NOT_FOUND;

  return user;
};

const create = async (user: IUser): Promise<IUser | QueryAnswers.NOT_FOUND> => {
  users.push(user);
  return get(user.id);
};

const update = async (
  userId: string,
  userData: IUser
): Promise<IUser | QueryAnswers.NOT_FOUND> => {
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) return QueryAnswers.NOT_FOUND;

  users[index] = { ...users[index], ...userData };
  return get(userId);
};

const remove = async (
  userId: string
): Promise<QueryAnswers.DELETED | QueryAnswers.NOT_FOUND> => {
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) return QueryAnswers.NOT_FOUND;

  users.splice(index, 1);

  return QueryAnswers.DELETED;
};

export { getAll, get, create, update, remove };
