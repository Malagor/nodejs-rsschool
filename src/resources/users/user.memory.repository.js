const database = require('../../memoryDb/memoryDb');

const { users } = database.memoryDb;

const getAll = async () => users;

const get = async (id) => {
  if (typeof id !== 'string') return null;
  return users.find((user) => user.id === id);
};

const set = async (user) => {
  users.push(user);
  return user;
};

const update = async (id, userData) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...userData, id };
    return get(id);
  }
  return null;
};

const remove = async (userId) => {
  if (typeof userId !== 'string') return -1;
  const index = users.findIndex((user) => user.id === userId);
  if (index !== -1) {
    users.splice(index, 1);
  }
  return false;
};

module.exports = {
  getAll,
  set,
  get,
  update,
  remove,
};
