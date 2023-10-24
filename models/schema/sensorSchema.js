const Joi = require('joi');

const sensorSchema = Joi.object({
  temperature_celsius: Joi.number().required(),
  humidity_percent: Joi.number().required(),
  pressure_hpa: Joi.number().required(),
  location: Joi.string(),
});
module.exports = sensorSchema;