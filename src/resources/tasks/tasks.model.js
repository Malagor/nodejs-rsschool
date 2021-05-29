const uuid = require('uuid');

/**
 * @typedef TaskType
 * @type {object}
 * @param {string} id - an ID task
 * @param {string} title - title
 * @param {number} order - order task on the column
 * @param {string} description - description of task
 * @param {string | null} userId - id user who create task
 * @param {string | null} boardId - id board where are pin task
 * @param {string | null} columnId - id column where are pin task
 */

/**
 * Create a new Task
 * @class
 */
class Task {
  /**
   *
   * @param {string} [id=uuid.v4()] - an ID task
   * @param {string} [title='Task'] - title
   * @param {number} [order=0] - order task on the column
   * @param {string} [description='Description'] - description of task
   * @param {string | null} [userId=null] - id user who create task
   * @param {string | null} [boardId=null] - id board where are pin task
   * @param {string | null} [columnId=null] - id column where are pin task
   */
  constructor({
    id = uuid.v4(),
    title = 'Task',
    order = 0,
    description = 'Description',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
