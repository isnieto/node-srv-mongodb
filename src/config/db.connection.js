// Create database connection
const mongoose = require("mongoose");
//const mongoUri = require("./db.config");

const db = require("../models");

const connection = async () => {
  try {
    await db.mongoose.connect(db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: false, // Don't build indexes
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

};

module.exports = connection;


