const boardRepo = require('./boards.memory.repository');
const tasksService = require('../tasks/tasks.service');

const getAllBoards = () => boardRepo.getAllBoards();
const getBoard = (id) => boardRepo.getBoard(id);
const setBoard = (board) => boardRepo.setBoard(board);
const updateBoard = (id, board) => boardRepo.updateBoard(id, board);
const deleteBoard = (id) => {
  tasksService.deleteTasksFromBoard(id);
  boardRepo.deleteBoard(id);
};

module.exports = {
  getAllBoards,
  getBoard,
  setBoard,
  updateBoard,
  deleteBoard
};
