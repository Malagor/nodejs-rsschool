const database = require('../../memoryDb/memoryDb');

let { tasks } = database.memoryDb;

const getAll = async (boardId) =>
  tasks.filter((task) => task.boardId === boardId);

const get = async (boardId, taskId) =>
  tasks.find((task) => task.id === taskId && task.boardId === boardId);

const create = async (task) => {
  tasks.push(task);
  return get(task.boardId, task.id);
};

const update = async (boardId, taskId, taskData) => {
  const index = tasks.findIndex(
    (task) => task.id === taskId && task.boardId === boardId
  );

  if (index === -1) return null;
  tasks[index] = { ...tasks[index], ...taskData, id: taskId };
  return get(boardId, taskId);
};

const remove = async (boardId, taskId) => {
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) return false;

  return tasks.splice(index, 1).length;
};

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
