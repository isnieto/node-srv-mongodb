//Create the collection Schema for mongo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({nickName: String});
// Create model and exports it
module.exports = mongoose.model("gamePlayer", {nickName: String});

const playerSchema = new mongoose.Schema({
  playerId: Number,
  nickName: String,
  registeredAt: { type: Date, default: Date.now },
  games: [
    {
      gameDate: { type: Date, default: Date.now },
      score: Number,
      result: Boolean,
    },
  ],
});

const GamePlayer = mongoose.model("GamePlayer", playerSchema);
// Create model and exports it
module.exports = GamePlayer;
