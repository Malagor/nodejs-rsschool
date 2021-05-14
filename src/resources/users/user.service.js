const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/tasks.service');

const getAll = () => usersRepo.getAll();
const getUser = (id) => usersRepo.getUser(id);
const setUser = (user) => usersRepo.setUser(user);
const updateUser = (id, user) => usersRepo.updateUser(id, user);
const deleteUser = (id) => {
  usersRepo.deleteUser(id);
  tasksService.deleteUserFromTask(id);
};

module.exports = {
  getAll,
  setUser,
  getUser,
  updateUser,
  deleteUser
};
