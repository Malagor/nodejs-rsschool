const taskRepo = require('./tasks.memory.repository');

const getAll = (boardId) => taskRepo.getAll(boardId);
const get = (boardId, taskId) => taskRepo.get(boardId, taskId);
const create = (taskData) => taskRepo.create(taskData);
const update = (boardId, taskId, taskData) =>
  taskRepo.update(boardId, taskId, taskData);
const remove = (boardId, taskId) => taskRepo.remove(boardId, taskId);
const deleteTasksFromBoard = (boardId) =>
  taskRepo.deleteTasksFromBoard(boardId);
const deleteUserFromTask = (userId) => taskRepo.deleteUserFromTask(userId);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  deleteTasksFromBoard,
  deleteUserFromTask,
};
