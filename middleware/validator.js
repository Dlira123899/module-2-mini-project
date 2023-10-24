const logger = require('../utils/winston-confg');

const validator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      logger.error(`${error}`);
      return res.status(400).json({
        error,
      });
    }
    next();
  }
};

module.exports = validator;
