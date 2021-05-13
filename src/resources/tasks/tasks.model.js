const uuid = require('uuid');

class Task {
  constructor({ title, order, description, userId, boardId, columnId } = {}) {
    this.id = uuid.v4();
    this.title = title || 'Task';
    this.order = order || 0;
    this.description = description || 'Description';
    this.userId = userId || 0;
    this.boardId = boardId || 0;
    this.columnId = columnId || 0;
  }
}

module.exports = Task;
