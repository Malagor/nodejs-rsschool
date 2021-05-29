const { getReasonPhrase } = require('http-status-codes');

const errorResponse = (res, code) =>
  res.status(code).json({ message: getReasonPhrase(code) });

module.exports = errorResponse;
