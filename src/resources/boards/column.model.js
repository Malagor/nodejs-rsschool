const uuid = require('uuid');

/**
 * @typedef ColumnType
 * @type {object}
 * @property {string} id - an ID.
 * @property {string} title - Title of column.
 * @property {number} order - Order the column on the board.
 */

/**
 * Create Columns for Board
 * @class Column
 */
class Column {
  /**
   *
   * @param {string} [id=uuid.v4()]
   * @param {string} [title='Column']
   * @param {number} [order=0] = Order the column on the board
   */
  constructor({ id = uuid.v4(), title = 'Column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
