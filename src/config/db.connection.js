// Create database connection and  import enviroment variables
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connection = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) =>
    console.log("Connection established with " + process.env.MONGO_URI)
  )
  .catch((err) => console.log(err));

module.exports = connection;
