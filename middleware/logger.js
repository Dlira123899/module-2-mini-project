const logger = require('../utils/winston-confg');

const loggerMiddleware = (req, res, next) => {
  logger.info(`Handled ${req.method} request from ${req.originalUrl}`);
  next();
};

module.exports = loggerMiddleware;
