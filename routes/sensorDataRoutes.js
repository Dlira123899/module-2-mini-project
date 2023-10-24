/* eslint-disable no-console */
/* eslint-disable camelcase */
const express = require('express');
const validator = require('../middleware/validator');
const sensorSchema = require('../models/schema/sensorSchema');
const SensorDataController = require('../controller/sensorDataController');

const router = express.Router();

// Retrieve
router.get('/sensor', async (req, res, next) => {
  try {
    const { body } = req;

    const sensorDataController = new SensorDataController();
    const result = await sensorDataController.selectAll(body.skip, body.limit);

    res.status(200).json({ message: 'Sensor Data', data: result });
  } catch (error) {
    next(error);
  }
});

// Create
router.post('/sensor', validator(sensorSchema), async (req, res, next) => {
  try {
    const { body } = req;

    const sensorDataController = new SensorDataController();
    const result = await sensorDataController.create(body);

    res.status(201).json({ message: 'Sensor data created', data: result });
  } catch (error) {
    next(error);
  }
});

// Update
router.put('/sensor/:id', validator(sensorSchema), async (req, res, next) => {
  try {
    const { body, params } = req;

    const sensorDataController = new SensorDataController();
    const result = await sensorDataController.update(params.id, body);

    res.status(201).json({ message: 'Sensor data updated', data: result });
  } catch (error) {
    next(error);
  }
});

// Delete
router.delete('/sensor/:id', async (req, res, next) => {
  try {
    const { params } = req;

    const sensorDataController = new SensorDataController();
    const result = await sensorDataController.delete(params.id);

    res.status(200).json({ message: 'Sensor data deleted', data: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
