const uuid = require('uuid');

/**
 * @typedef UserType
 * @type {object}
 * @property {string} id - an ID
 * @property {string} name - name of user
 * @property {string} login - login
 * @property {string} password - password
 */

/**
 * Create a new User
 * @class
 */
class User {
  /**
   * @param {string} id - an ID
   * @param {string} name - name of user
   * @param {string} login - login
   * @param {string} password - password
   */
  constructor({ id = uuid.v4(), name, login, password }) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Format user data without password
   * @param user
   * @return {{name: *, id: *, login: *}}
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
