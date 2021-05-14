const uuid = require('uuid');
const Column = require('./column.model');
const database = require('../../memoryDb/memoryDb');

const { boards } = database.memoryDb;

const getAllBoards = async () => boards;

const getBoard = async (id) => {
  if (typeof id !== 'string') return null;
  return boards.find(board => board.id === id);
};

const setBoard = async (board) => {
  const { title, columns } = board;

  let columnsWithId;

  if (columns) {
    columnsWithId = columns.map(col => ({
        ...col,
        id: uuid.v4()
      }));
  } else {
    columnsWithId = [new Column()];
  }

  const boardData = {
    columns: columnsWithId,
    title,
    id: uuid.v4(),
  };

  boards.push(boardData);

  return boardData;
};

const updateBoard = async (id, boardData) => {
  const index = boards.findIndex(board => board.id === id);

  if (index !== -1) {
    const newBoardData = { ...boardData, id };
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
