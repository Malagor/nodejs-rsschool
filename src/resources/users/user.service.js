const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/tasks.service');

/**
 * Return all users
 * @return {Promise<UserType[]>}
 */
const getAll = () => usersRepo.getAll();

/**
 * Return user by ID
 * @param {string} id - id user
 * @return {Promise<{password: string, name: string, id: string, login: string}|{password: string, name: string, id: string, login: string}|undefined>}
 */
const get = (id) => usersRepo.get(id);

/**
 * Create new user
 * @param {UserType} user - user data for create
 * @return {Promise<{password: string, name: string, id: string, login: string}|{password: string, name: string, id: string, login: string}|undefined>}
 */
const create = (user) => usersRepo.create(user);

/**
 *  Update user
 * @param {string} id - id user
 * @param {UserType} userData - user data for update
 * @return {Promise<{password: string, name: string, id: string, login: string}|{password: string, name: string, id: string, login: string}|undefined|null>}
 */
const update = (id, userData) => usersRepo.update(id, userData);

/**
 * Delete user
 * @param {string} id - id user
 * @return {Promise<[(boolean|number), (boolean|undefined)]>} - flags of success operations deleting
 */
const remove = (id) =>
  Promise.all([usersRepo.remove(id), tasksService.deleteUserFromTask(id)]);

module.exports = {
  getAll,
  create,
  get,
  update,
  remove,
};
