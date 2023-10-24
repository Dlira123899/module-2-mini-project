const Joi = require('joi');
const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const Sensor = require('../models/sensor');
const sensorSchema = require('../models/schema/sensorSchema');
const router = express.Router();

// Retrieve
router.get('/sensor', async(req, res, next) => {
  try {
    const { body, params, query } = req;
    console.log(req);
    console.log('Params: ', params);
    console.log('Query: ', query);
    console.log('Body: ', body);
    res.status(200).json({ id: 1, message: 'Hello' });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Create
router.post('/sensor', async(req, res, next) => {
  try {
    const { body, params, query } = req;
    console.log(req);
    console.log('Params: ', params);
    console.log('Query: ', query);
    console.log('Body: ', body);
    res.status(201).json({ id: 1, message: 'Created' });
  } catch (error) {
    next(error);
  }
});

// Update

// Delete

module.exports = router;