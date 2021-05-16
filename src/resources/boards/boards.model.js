const uuid = require('uuid');
const Column = require('./column.model');

class Board {
  constructor({ id, title, columns } = {}) {
    this.id = id || uuid.v4();
    this.title = title || 'Board';
    this.columns = Board.createColumns(columns);
  }

  static createColumns(columns) {
    if (Array.isArray(columns)) {
      return columns.map(col => new Column({ ...col }))
    }
    return [new Column()];
  }
}

module.exports = Board;
