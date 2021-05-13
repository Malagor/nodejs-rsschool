const uuid = require('uuid');


class Column {
  constructor(title, order) {
    this.id = uuid.v4();
    this.title = title || 'Column';
    this.order = order || 0;
  }
}


module.exports = Column;
