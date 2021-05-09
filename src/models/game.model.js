//Create the collection Schema for mongo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*var userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, 'You must provide a name']
  },
  email: {
    type: Schema.Types.String,
    required: [true, 'Email address is required']
  },
  username: {
    type: Schema.Types.String,
    required: [true, 'Username is required']
  },
  password: {
    type: Schema.Types.String,
    required: [true, 'You must provide a password']
  }
}) */
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
      score: { type: Number, min: 0, max: 12, required: true },
      result: Boolean,
    },
  ],
});

const GamePlayer = mongoose.model("GamePlayer", playerSchema);
// Create model and exports it
module.exports = GamePlayer;
