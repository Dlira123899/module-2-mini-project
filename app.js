/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const sensorDataRoutes = require('./routes/sensorDataRoutes');
const CronJob = require('./cron/cronJob');
const logger = require('./middleware/logger');
const connectDB = require('./database/db');

const app = express();

connectDB();

app.use(express.json());

app.use(logger);

// Routes
app.use('/api', sensorDataRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Application running on PORT ${process.env.PORT}`);
  // Start Cron Jobs
  new CronJob().schedule();
});
