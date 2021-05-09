// Create database connection
const mongoose = require("mongoose");
const mongodb_uri = require("./db.config");
console.log(mongodb_uri)
const connection = mongoose.connect(mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(db => console.log("Connection established with " + mongodb_uri ))
  .catch(err => console.log(err))

module.exports = connection;
