const { getReasonPhrase } = require('http-status-codes');

/**
 *
 * @param {Response} res - response of server
 * @param {number} code - code answer server
 * @return {*|Promise<any>}
 */
const errorResponse = (res, code) =>
  res.status(code).json({ message: getReasonPhrase(code) });

module.exports = errorResponse;
