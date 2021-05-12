const uuid = require('uuid');

// { id, name, login, password }
const userTable = [{
  id: 'cbd836d9-ff4b-45be-bc71-9749eabfc980',
  name: 'Alex',
  login: 'alex',
  password: '12345'
}];

const getAll = async () => userTable;

const getUser = async (id) => {
  if (typeof id !== 'string') return null;
  return userTable.find(user => user.id === id);
};

const setUser = async (user) => {
  const id = uuid.v4();
  const {name, login, password} = user;
  userTable.push({
    id,
    name,
    login,
    password });

  return {
    id,
    name,
    login
  };
};

const updateUser = async (id, userData) => {
  const index = userTable.findIndex(user => user.id === id);

  if (index !== -1) {
    const {name, login, password} = userData;
    userTable[index] = {id, name, login, password};
    return {
      id,
      name,
      login
    };
  }

  return -1;
};

const deleteUser = async (id) => {
  if (typeof id !== 'string') return -1;
  const index = userTable.findIndex(user => user.id === id);
  if (index !== -1) {
    userTable.splice(index, 1);
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
