const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true
    });
    console.log('Connected to database');
  } catch (err) {
    console.log('Error in database connection');
    process.exit(1);
  }
};

module.exports = connectDB;
