const uuid = require('uuid');
const Column = require('./column.model');

class Board {
  constructor({ id = uuid.v4(), title = 'Board', columns }) {
    this.id = id;
    this.title = title;
    this.columns = Board.createColumns(columns);
  }

  static createColumns(columns) {
    if (Array.isArray(columns)) {
      return columns.map((col) => new Column({ ...col }));
    }
    return [new Column()];
  }
}

module.exports = Board;
