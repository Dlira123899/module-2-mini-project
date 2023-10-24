const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  location: {
    type: String
  },
  temperature_celsius: {
    type: Number,
    required: true
  },
  humidity_percent: {
    type: Number,
    required: true
  },
  pressure_hpa: {
    type: Number,
    required: true
  }
});

const Sensor = mongoose.model('Sensor', sensorSchema);
module.exports = Sensor;

