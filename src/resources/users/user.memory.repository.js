const database = require('../../memoryDb/memoryDb');

const { users } = database.memoryDb;

const getAll = async () => users;

const getUser = async (id) => {
  if (typeof id !== 'string') return null;
  return users.find(user => user.id === id);
};

const setUser = async (user) => {
  users.push(user);
  return user;
};

const updateUser = async (id, userData) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    const user = {...users[index], ...userData, id};
    users[index] = user;
    return user;
  }
  return index;
};

const deleteUser = async (userId) => {
  if (typeof userId !== 'string') return -1;
  const index = users.findIndex(user => user.id === userId);
  if (index !== -1) {
    users.splice(index, 1);
  }
  return index;
};

module.exports = {
  getAll,
  setUser,
  getUser,
  updateUser,
  deleteUser
};
