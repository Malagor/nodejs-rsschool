const database = require('../../memoryDb/memoryDb');

const { users } = database.memoryDb;

const getAll = async () => [...users];

const get = async (id) => users.find((user) => user.id === id);

const create = async (user) => {
  users.push(user);
  return get(user.id);
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
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) return false;

  return users.splice(index, 1).length;
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
