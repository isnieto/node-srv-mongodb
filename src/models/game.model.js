//Create the collection Schema for mongo
const mongoose = require("mongoose");
//const Schema = mongoose.Schema;

/* const schema = new Schema({
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
}); */

const playerSchema = new mongoose.Schema({
  playerId: Number,
  nickName: String,
  registeredAt: { type: Date, default: Date.now },
  games: [
    {
      gameDate: { type: Date, default: Date.now },
      score: { type: Number, min: 0, max: 12, required: true },
      result: Boolean,
    },
  ],
});

const GamePlayer = mongoose.model("GamePlayer", playerSchema);
// Create model and exports it
module.exports = GamePlayer;
