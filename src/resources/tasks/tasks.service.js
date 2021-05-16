const taskRepo = require('./tasks.memory.repository');

const getAll = (boardId) => taskRepo.getAll(boardId);
const get = (boardId, taskId) => taskRepo.get(boardId, taskId);
const set = (taskData) => taskRepo.set(taskData);
const update = (boardId, taskId, taskData) => taskRepo.update(boardId, taskId, taskData);
const remove = (boardId, taskId) => taskRepo.remove(boardId, taskId);
const deleteTasksFromBoard = (boardId) => taskRepo.deleteTasksFromBoard(boardId);
const deleteUserFromTask = (userId) => taskRepo.deleteUserFromTask(userId);

module.exports = {
  getAll,
  get,
  set,
  update,
  remove,
  deleteTasksFromBoard,
  deleteUserFromTask
};
