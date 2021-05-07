const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const dadosGame = require("./game.model.js");

//mongoose.Promise = global.Promise;

const db = {
  mongoose: mongoose,
  url: dbConfig.url,
  game: dadosGame

};

module.exports = db;