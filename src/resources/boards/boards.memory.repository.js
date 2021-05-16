const database = require('../../memoryDb/memoryDb');

const { boards } = database.memoryDb;

const getAll = async () => boards;

const get = async (id) => {
  if (typeof id !== 'string') return null;
  return boards.find(board => board.id === id);
};

const set = async (board) => {
  boards.push(board);
  return board;
};

const update = async (id, boardData) => {
  const index = boards.findIndex(board => board.id === id);

  if (index !== -1) {
    const newBoardData = {...boards[index], ...boardData, id };
    boards[index] = newBoardData;
    return newBoardData;
  }

  return index;
};

const remove = async (boardId) => {
  if (typeof boardId !== 'string') return -1;
  const index = boards.findIndex(board => board.id === boardId);
  if (index !== -1) {
    boards.splice(index, 1);
  }
  return index;
};

module.exports = {
  getAll,
  get,
  set,
  update,
  remove
};
