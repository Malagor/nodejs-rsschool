const boardRepo = require('./boards.memory.repository');
const tasksService = require('../tasks/tasks.service');

/**
 *  Return Promise array of Boards
 * @return {Promise<[BoardType]>}
 */
const getAll = () => boardRepo.getAll();

/**
 *  Return Promise Board by id
 * @param {string} id - id of board
 * @return {Promise<{columns: [{id: string, title: string, order: number}], id: string, title: string}|undefined>}
 */
const get = (id) => boardRepo.get(id);

/**
 * Create Board
 * @param board
 * @return {Promise<{columns: [{id: string, title: string, order: number}], id: string, title: string}|undefined>}
 * Return new Board
 */
const create = (board) => boardRepo.create(board);

/**
 * Upadate Board
 * @param {string} id - id of board
 * @param board - new data of Board
 * @return {Promise<null|{columns: [{id: string, title: string, order: number}], id: string, title: string}|undefined>}
 */
const update = (id, board) => boardRepo.update(id, board);

/**
 * Delete board and all tasks of this board
 * @param id {string} - id of Board
 * @return {Promise<[(boolean|undefined), (boolean|number)]>} - result delete board and task as array of promises
 */
const remove = (id) =>
  Promise.all([tasksService.deleteAllTasksFromBoard(id), boardRepo.remove(id)]);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
