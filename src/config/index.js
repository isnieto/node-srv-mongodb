const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

//mongoose.Promise = global.Promise;

const db = {
  mongoose : mongoose,
  url: dbConfig.url,
  game: require("./game.model.js")(mongoose)

};

module.exports = db;