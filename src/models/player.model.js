// Load modules: model for database and functions for the gameplay
const gamePlayer = require("../models/game.model.js");
const countPlayers = require("../services/games.services.js");
const conn = require("../config/db.connection")

//  Player class and use the database connection above to add  CRUD methods:
class Player {
  constructor(playerName) {
    this.nickName = playerName;
  }

  // Check if PlayerName already exists in database
  static checkIfPlayerExists(playerName) {
    return new Promise((reject, resolve) => {
      gamePlayer.find({ nickName: `${playerName}` }, (err, res) => {
        // If Name no exists response is false
        if (err || res.length !== 0) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  // Create new Player after counting how many palyer to assign to idNr.
  static async newPlayer(playerName) {
    const player = new gamePlayer({
      name: `${playerName}`,
    });
    console.log(player)
    try {
      const res = await player.save();
      return res
    } catch (error) {
      return error;
    }
  }
} // END CLass Game

// Export
module.exports = Player;
