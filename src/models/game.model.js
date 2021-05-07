//Create the collection Schema for mongo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: { type: Number, required: true },
  nickName: String,
  registeredAt: { type: Date, default: Date.now },
  games: [
    {
      gameNr: { type: Number, required: true },
      gaemeDate: { type: Date, default: Date.now },
      score: { type: Number, min: 0, max: 12, required: true },
      result: Boolean,
    },
  ],
});

// Create model and exports it
module.exports = mongoose.model("gamePlayer", schema);
