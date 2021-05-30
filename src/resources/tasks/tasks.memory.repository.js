const database = require('../../memoryDb/memoryDb');

/**
 * @type {TaskType[]}
 * @description table of Tasks from Database
 */
let { tasks } = database.memoryDb;

/**
 *Return all Tasks from the board
 * @param {string} boardId - id of board
 * @return {Promise<TaskType[]>} - array of Tasks
 */
const getAll = async (boardId) =>
  tasks.filter((task) => task.boardId === boardId);

/**
 * Return one task from the board by ID
 * @param {string} boardId - id of board
 * @param {string} taskId - id of task
 * @return {Promise<TaskType>}
 */
const get = async (boardId, taskId) =>
  tasks.find((task) => task.id === taskId && task.boardId === boardId);

/**
 * Create task
 * @param {TaskType} task - data for create task
 * @return {Promise<TaskType>}
 */
const create = async (task) => {
  tasks.push(task);
  return get(task.boardId, task.id);
};

/**
 * Update task data
 * @param {string} boardId - id of board
 * @param {string} taskId - id of task
 * @param taskData
 * @return {Promise<null|TaskType>}
 */
const update = async (boardId, taskId, taskData) => {
  const index = tasks.findIndex(
    (task) => task.id === taskId && task.boardId === boardId
  );

  if (index === -1) return null;
  tasks[index] = { ...tasks[index], ...taskData, id: taskId };
  return get(boardId, taskId);
};

/**
 * Delete task by ID
 * @param {string} boardId - id of board
 * @param {string} taskId - id of task
 * @return {Promise<boolean|number>}
 */
const remove = async (boardId, taskId) => {
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) return false;

  return tasks.splice(index, 1).length;
};

/**
 * Delete user from tasks after user deleting
 * @param {string} userId - id of user
 * @return {Promise<boolean>}
 */
const deleteUserFromTask = async (userId) => {
  try {
    tasks.forEach((task, idx) => {
      if (task.userId === userId) {
        tasks[idx].userId = null;
      }
    });
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Delete all tasks from board
 * @param {string} boardId - id of board
 * @return {Promise<boolean>} - flag of success
 */
const deleteTasksFromBoard = async (boardId) => {
  try {
    tasks = tasks.filter((task) => task.boardId !== boardId);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  deleteTasksFromBoard,
  deleteUserFromTask,
};
