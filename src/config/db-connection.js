// Create database connection
// Database connection data comes from db.config.js


const mongoose = require("mongoose");
const dbConfig = require("./db.config.js");

const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MondoDB connected: ${conn.connection.HOST}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = connection;
