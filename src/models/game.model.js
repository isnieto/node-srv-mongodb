const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dadosGameSchema = new Schema({
  _id: Number,
  nickName: String,
  registeredAt: Date,
  games: [
    {
      gameNr: Number,
      gaemeDate: { type: Date, default: Date.now },
      score: Number,
      result: Boolean,
    },
  ],
});

// Create model
const dadosGame = mongoose.model("dadosGame", dadosGameSchema);
