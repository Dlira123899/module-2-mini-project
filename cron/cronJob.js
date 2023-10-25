/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const cron = require('node-cron');
const axios = require('axios');

class CronJob {
  constructor() {
    console.log('Cron Jobs initialize.');
  }

  schedule() {
    cron.schedule('* * * * *', async () => {
      console.log('Cron job is running');

      // Create sensor data
      const base_url = `http://${process.env.HOST}:${process.env.PORT}/api/sensor`;
      axios.post(base_url, this.generateData())
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e.message));
    });
  }

  generateData() {
    return {
      location: `Location ${Math.floor(Math.random() * 3) + 1}`, // random location
      temperature_celsius: (Math.random() * 15) + 20, // random temperature between 20 and 35
      humidity_percent: Math.floor(Math.random() * 100), // random humidity
      pressure_hpa: Math.floor(Math.random() * 50) + 970, // random pressure between 970 and 1020
    };
  }
}

module.exports = CronJob;
