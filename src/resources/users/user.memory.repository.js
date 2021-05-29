const database = require('../../memoryDb/memoryDb');

/**
 * @type {UserType[]} - table of User from Database
 */
const { users } = database.memoryDb;

/**
 * Return all users
 * @return {Promise<UserType[]>}
 */
const getAll = async () => [...users];

/**
 * return user by ID
 * @param {string} id - id of user
 * @return {Promise<UserType>}
 */
const get = async (id) => users.find((user) => user.id === id);

/**
 * Create new user
 * @param {UserType} user - data for new user
 * @return {Promise<UserType>}
 */
const create = async (user) => {
  users.push(user);
  return get(user.id);
};

/**
 * Update user
 * @param {string} id - id of user
 * @param {UserType} userData - data for update user
 * @return {Promise<null|UserType>}
 */
const update = async (id, userData) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...userData, id };
    return get(id);
  }
  return null;
};

/**
 * Delete user
 * @param {string} userId - id of user
 * @return {Promise<boolean|number>}
 */
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
