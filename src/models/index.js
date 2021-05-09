const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");


const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.game = require("./game.model.js")(mongoose);

module.exports = db;