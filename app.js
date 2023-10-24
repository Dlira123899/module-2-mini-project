require('dotenv').config();
const express = require('express');
const sensorDataRoutes = require('./routes/sensorDataRoutes');
const app = express();

const PORT = 3000;

app.use(express.json());

// Routes
app.use('/api', sensorDataRoutes);

app.listen(PORT, () => {
  console.log(`Application running on PORT ${PORT}`);
});