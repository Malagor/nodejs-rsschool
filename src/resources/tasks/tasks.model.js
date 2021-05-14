const uuid = require('uuid');

class Task {
  constructor({ title, order, description, userId, boardId, columnId } = {}) {
    this.id = uuid.v4();
    this.title = title || 'Task';
    this.order = order || 0;
    this.description = description || 'Description';
    this.userId = userId || null;
    this.boardId = boardId || null;
    this.columnId = columnId || null;
  }
}

module.exports = Task;
