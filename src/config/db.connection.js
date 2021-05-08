// Create database connection
const mongoose = require("mongoose");
const mongoUri = require("./db.config");


const connection = async () => {
  try {
    await mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + mongoURI);
    }); 
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

};

module.exports = connection;


