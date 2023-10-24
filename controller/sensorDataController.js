/* eslint-disable no-console */
/* eslint-disable camelcase */
const SensorModel = require('../models/sensorModel');
const SendEmail = require('../utils/mailer');

class SensorDataController {
  #NOT_FOUND_MSG = 'Record not found';

  constructor() {
    this.temperature_celsius = process.env.temperature_celsius;
    this.humidity_percent = process.env.humidity_percent;
    this.pressure_hpa = process.env.pressure_hpa;
    this.sensor_data_empty_msg = 'Sensor data was empty';
  }

  async selectAll(skip, limit) {
    const total = await SensorModel.find().count().exec();

    const result = await SensorModel
      .find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: 1 })
      .exec();

    if (!result) throw new Error(this.sensor_data_empty_msg);

    const paginaton = {
      data: result,
      total,
    };
    const next = skip + limit;
    const nextPage = (next < total) ? next : 0;
    const prevPage = skip - limit;
    if (nextPage > 0) {
      paginaton.nextPage = nextPage;
    }
    if (next > limit) {
      paginaton.prevPage = prevPage;
    }
    return paginaton;
  }

  async create(body) {
    const content = this.#validate(body);

    const sensorData = new SensorModel(body);
    const result = await sensorData.save();

    // Notification
    if (content.length > 0) {
      await SendEmail(content);
    }
    return result;
  }

  async update(id, values) {
    const updated = await SensorModel.findByIdAndUpdate(id, values, { new: true });
    if (!updated) throw new Error(this.#NOT_FOUND_MSG);

    const content = this.#validate(values);
    // Notification
    if (content.length > 0) {
      await SendEmail(content);
    }
    return updated;
  }

  async delete(id) {
    const deleted = await SensorModel.findByIdAndDelete(id);
    if (!deleted) throw new Error(this.#NOT_FOUND_MSG);
    return deleted;
  }

  #validate(values) {
    const { temperature_celsius, humidity_percent, pressure_hpa } = values;
    // check threshold
    const exceed = [];
    if (temperature_celsius > this.temperature_celsius) {
      exceed.push(`temperature_celsius exceed threshold ${this.temperature_celsius}`);
    }
    if (humidity_percent > this.humidity_percent) {
      exceed.push(`humidity_percent exceed threshold ${this.humidity_percent}`);
    }
    if (pressure_hpa > this.pressure_hpa) {
      exceed.push(`pressure_hpa exceed threshold ${this.pressure_hpa}`);
    }
    return exceed;
  }
}

module.exports = SensorDataController;
