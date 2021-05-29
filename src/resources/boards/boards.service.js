const boardRepo = require('./boards.memory.repository');
const tasksService = require('../tasks/tasks.service');

const getAll = () => boardRepo.getAll();
const get = (id) => boardRepo.get(id);
const create = (board) => boardRepo.create(board);
const update = (id, board) => boardRepo.update(id, board);
const remove = (id) => {
  tasksService.deleteTasksFromBoard(id);
  boardRepo.remove(id);
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
