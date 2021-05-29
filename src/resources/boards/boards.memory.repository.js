const database = require('../../memoryDb/memoryDb');

/**
 * @type {BoardType[]} - table of Boards from Database
 */
const { boards } = database.memoryDb;

/**
 * Return all Boards
 * @return {Promise<[BoardType]>}
 */
const getAll = async () => [...boards];

/**
 * Return Board by Id
 * @param boardId {string} - id of Board
 * @return {Promise<BoardType>}
 */
const get = async (boardId) => boards.find((item) => item.id === boardId);

/**
 * Create Board
 * @param boardData {BoardType} - data of board for create
 * @return {Promise<BoardType>}
 */
const create = async (boardData) => {
  boards.push(boardData);
  return get(boardData.id);
};

/**
 * Update Board
 * @param boardId {string} - id of Board
 * @param boardData {Board} - new data of Board
 * @return {Promise<Board|null>}
 */
const update = async (boardId, boardData) => {
  const index = boards.findIndex((board) => board.id === boardId);
  if (index === -1) return null;

  boards[index] = { ...boards[index], ...boardData, itemId: boardId };
  return get(boardId);
};

/**
 * Delete Board
 * @param itemId {string} - id of Board
 * @return {Promise<boolean|number>}
 */
const remove = async (itemId) => {
  const index = boards.findIndex((item) => item.id === itemId);
  if (index === -1) return false;

  return boards.splice(index, 1).length;
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
