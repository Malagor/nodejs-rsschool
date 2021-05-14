const taskRepo = require('./tasks.memory.repository');

const getAllTasks = (boardId) => taskRepo.getAllTasks(boardId);
const getTask = (boardId, taskId) => taskRepo.getTask(boardId, taskId);
const setTask = (boardId, taskData) => taskRepo.setTask(boardId, taskData);
const updateTask = (boardId, taskId, taskData) => taskRepo.updateTask(boardId, taskId, taskData);
const deleteTask = (boardId, taskId) => taskRepo.deleteTask(boardId, taskId);
const deleteTasksFromBoard = (boardId) => taskRepo.deleteTasksFromBoard(boardId);
const deleteUserFromTask = (userId) => taskRepo.deleteUserFromTask(userId);

module.exports = {
  getAllTasks,
  getTask,
  setTask,
  updateTask,
  deleteTask,
  deleteTasksFromBoard,
  deleteUserFromTask
};
