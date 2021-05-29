const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/tasks.service');

const getAll = () => usersRepo.getAll();
const get = (id) => usersRepo.get(id);
const create = (user) => usersRepo.create(user);
const update = (id, userData) => usersRepo.update(id, userData);
const remove = (id) =>
  Promise.all([usersRepo.remove(id), tasksService.deleteUserFromTask(id)]);

module.exports = {
  getAll,
  create,
  get,
  update,
  remove,
};
