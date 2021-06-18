import { memoryDb } from '../../memoryDb/memoryDb';
import { IUser, QueryAnswers } from '../../types';

let { users } = memoryDb;

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
  id: string,
  userData: Omit<IUser, 'id'>
): Promise<IUser | QueryAnswers.NOT_FOUND> => {
  let user = await get(id);
  if (user === QueryAnswers.NOT_FOUND) return QueryAnswers.NOT_FOUND;

  user = { ...user, ...userData };
  return { ...user };
};

const remove = async (
  userId: string
): Promise<QueryAnswers.DELETED | QueryAnswers.NOT_FOUND> => {
  const user = await get(userId);
  if (user === undefined) return QueryAnswers.NOT_FOUND;

  users = users.filter((u) => u.id !== userId);

  return QueryAnswers.DELETED;
};

export { getAll, get, create, update, remove };
