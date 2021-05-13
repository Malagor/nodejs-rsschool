const uuid = require('uuid');
const Column = require('./column.model');

const boards = [];

const getAllBoards = async () => boards;

const getBoard = async (id) => {
  if (typeof id !== 'string') return null;
  return boards.find(board => board.id === id);
};

const setBoard = async (board) => {
  const idBoard = uuid.v4();
  const { title, columns } = board;

  let columnsWithId;

  if (columns) {
    columnsWithId = columns.map(col => {
      const idColumn = uuid.v4();
      return {
        id: idColumn,
        ...col
      };
    });
  } else {
    columnsWithId = [new Column()];
  }

  const boardData = {
    id: idBoard,
    title,
    columns: columnsWithId
  };

  boards.push(boardData);

  return boardData;
};

const updateBoard = async (id, boardData) => {
  const index = boards.findIndex(board => board.id === id);

  if (index !== -1) {
    const newBoardData = {id, ...boardData};
    boards[index] = newBoardData;
    return newBoardData;
  }

  return -1;
};

const deleteBoard = async (id) => {
  if (typeof id !== 'string') return -1;
  const index = boards.findIndex(user => user.id === id);
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
