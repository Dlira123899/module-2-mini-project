const cron = require('node-cron');
const axios = require('axios');

class CronJob {
  
  constructor() {
    console.log('Cron Jobs initialize.');
  }
  
  schedule () {
    cron.schedule('* * * * *', async () => {
      console.log('Cron job is running');

      // Create sensor data
      axios.post('http://localhost:3000/api/sensor', this.generateData())
      .then(res => console.log(res.data))
      .catch(e => console.log(e.message));
    });
  }

  generateData() {
    return {
      location: `Location${Math.floor(Math.random() * 3) + 1}`, // random location
      temperature_celsius: (Math.random() * 15) + 20, // random temperature between 20 and 35
      humidity_percent: Math.floor(Math.random() * 100), // random humidity
      pressure_hpa: Math.floor(Math.random() * 50) + 970 // random pressure between 970 and 1020
    }
  }
}

module.exports = CronJob;