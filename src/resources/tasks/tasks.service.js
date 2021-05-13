const taskRepo = require('./tasks.memory.repository');

const getAllTasks = () => taskRepo.getAllTasks();

module.exports = {
  getAllTasks
};
