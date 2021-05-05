// Create database connection
// Database connection data comes from db.config.js

const mongoose = require("mongoose");
const { DB } = require("./db-config.js");
const dbConfig = require("./db.config.js");


const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MondoDB connected to : ${conn.connection.HOST} database`);
 
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connection;
