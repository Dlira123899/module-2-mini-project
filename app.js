require('dotenv').config();
const express = require('express');
const sensorDataRoutes = require('./routes/sensorDataRoutes');
// Cron Jobs
const CronJob = require('./cron/cronJob');
const app = express();

const PORT = 3000;

app.use(express.json());

// Routes
app.use('/api', sensorDataRoutes);

app.listen(PORT, () => {
  console.log(`Application running on PORT ${PORT}`);
  // Start Cron Jobs
  new CronJob().schedule();
});