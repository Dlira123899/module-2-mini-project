/* eslint-disable no-unused-vars */
const logger = require('../utils/winston-confg');

const handleError = (err, req, res, next) => {
  console.log('handleError');
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
  });

  logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
};

module.exports = handleError;
