// Create database connection
const mongoose = require("mongoose");
//const mongoUri = require("./db.config");

const db = require("../models");

const connection = async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  const database = mongoose.connection;
  database.on("error", console.error.bind(console, "connection error:")); // enlaza el track de error a la consola (proceso actual)
  database.once("open", () => {
    console.log("connected"); // si esta todo ok, imprime esto
  });
};

module.exports = connection;


