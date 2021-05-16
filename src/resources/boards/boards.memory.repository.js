const database = require('../../memoryDb/memoryDb');

const { boards } = database.memoryDb;

const getAllBoards = async () => boards;

const getBoard = async (id) => {
  if (typeof id !== 'string') return null;
  return boards.find(board => board.id === id);
};

const setBoard = async (board) => {
  boards.push(board);
  return board;
};

const updateBoard = async (id, boardData) => {
  const index = boards.findIndex(board => board.id === id);

  if (index !== -1) {
    const newBoardData = {...boards[index], ...boardData, id };
    boards[index] = newBoardData;
    return newBoardData;
  }

  return index;
};

const deleteBoard = async (boardId) => {
  if (typeof boardId !== 'string') return -1;
  const index = boards.findIndex(board => board.id === boardId);
  if (index !== -1) {
    boards.splice(index, 1);
  }
  return index;
};

module.exports = {
  getAllBoards,
  getBoard,
  setBoard,
  updateBoard,
  deleteBoard
};
