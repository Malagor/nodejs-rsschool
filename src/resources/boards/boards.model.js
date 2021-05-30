const uuid = require('uuid');
const Column = require('./column.model');

/**
 * @typedef BoardType
 * @type {object}
 * @property {string} id - an ID.
 * @property {string} title - your name.
 * @property {ColumnType[]} columns - array of columns data.
 */

/**
 * Create a Trello Board
 * @class Board
 */
class Board {
  /**
   * Create a board
   * @param {string} [id=uuid.v4()] - id of board
   * @param {string} [title=Board] - Title of board
   * @param {ColumnType[]|null} [columns=null] - array data for create columns
   */
  constructor({ id = uuid.v4(), title = 'Board', columns = null }) {
    this.id = id;
    this.title = title;
    this.columns = Board.createColumns(columns);
  }

  /**
   * Create columns from data of columns
   * @param {ColumnType[]} columns - array data for create columns
   * @return {ColumnType[]|*}
   */
  static createColumns(columns) {
    if (Array.isArray(columns)) {
      return columns.map((col) => new Column({ ...col }));
    }
    return [new Column()];
  }
}

module.exports = Board;
