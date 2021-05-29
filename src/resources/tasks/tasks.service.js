const taskRepo = require('./tasks.memory.repository');

/**
 * Retuan all task from board
 * @param {string} boardId - an id of Board for choice tasks
 * @return {Promise<TaskType[]>}
 */
const getAll = (boardId) => taskRepo.getAll(boardId);

/**
 * Return task from board by Id
 * @param {string} boardId - boards`s id
 * @param {string} taskId - task`s id
 * @return {Promise<TaskType>}
 */
const get = (boardId, taskId) => taskRepo.get(boardId, taskId);

/**
 * Create new task
 * @param {TaskType} taskData - data for create task
 * @return {Promise<TaskType>} - new Task
 */
const create = (taskData) => taskRepo.create(taskData);

/**
 * Update an existing task
 * @param {string} boardId - id of board
 * @param {string} taskId - id of task
 * @param {TaskType} taskData - new data of task
 * @return {Promise<TaskType>} - return task with new data
 */
const update = (boardId, taskId, taskData) =>
  taskRepo.update(boardId, taskId, taskData);

/**
 * Delete task from database by ID
 * @param {string} boardId - id of board
 * @param {string} taskId - id of task
 * @return {Promise<boolean|number>} - return isSuccess flag
 */
const remove = (boardId, taskId) => taskRepo.remove(boardId, taskId);

/**
 * Delete all tasks from board
 * @param {string} boardId - id of board
 * @return {Promise<boolean|undefined>} - return isSuccess flag 1 || true is success, false is failed
 */
const deleteAllTasksFromBoard = (boardId) =>
  taskRepo.deleteTasksFromBoard(boardId);

/**
 * Delete data of user from the tasks after delete user
 * @param {string} userId - id of user
 * @return {Promise<boolean|undefined>}
 */
const deleteUserFromTask = (userId) => taskRepo.deleteUserFromTask(userId);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  deleteAllTasksFromBoard,
  deleteUserFromTask,
};
