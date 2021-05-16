const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/tasks.service');

const getAll = () => usersRepo.getAll();
const get = (id) => usersRepo.get(id);
const set = (user) => usersRepo.set(user);
const update = (id, user) => usersRepo.update(id, user);
const remove = (id) => {
  usersRepo.remove(id);
  tasksService.deleteUserFromTask(id);
};

module.exports = {
  getAll,
  set,
  get,
  update,
  remove,
};
