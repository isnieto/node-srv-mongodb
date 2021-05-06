// Create database connection
// Database connection data comes from db.config.js
//const mongoose = require("mongoose");
// Using ES6 imports
const mongoose = require("mongoose");
const mongoUri = require("./db.config");

const connection = async () => {
  try {
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:")); // enlaza el track de error a la consola (proceso actual)
  db.once("open", () => {
    console.log("connected"); // si esta todo ok, imprime esto
  });
};

module.exports = connection;
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });