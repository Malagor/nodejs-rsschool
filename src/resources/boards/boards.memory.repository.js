const database = require('../../memoryDb/memoryDb');

const { boards } = database.memoryDb;

const getAll = async () => [...boards];

const get = async (id) => boards.find((board) => board.id === id);

const create = async (board) => {
  const { id } = board;
  boards.push(board);
  return get(id);
};

const update = async (id, boardData) => {
  const index = boards.findIndex((board) => board.id === id);

  if (index === -1) return false;

  boards[index] = { ...boards[index], ...boardData, id };

  return get(id);
};

const remove = async (boardId) => {
  if (typeof boardId !== 'string') return -1;
  const index = boards.findIndex((board) => board.id === boardId);
  if (index !== -1) {
    boards.splice(index, 1);
  }
  return index;
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
