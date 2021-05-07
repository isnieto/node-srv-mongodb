//  Import db.connection and Mysql Queries
//const connDb = require("../config/db.connection.js");
const gamePlayer = require("../models/game.model.js");
const countPlayers = require("../services/games.services.js");

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
    const newplayer = new gamePlayer({
      _id: 1,
      nickName: `${playerName}`,
    });
    newplayer.save((err, res) => {
      if (err) {
        return err;
      }
      return res;
    });
  }
  // Get all data from players
  static getAllPlayers() {
    return new Promise((resolve, reject) => {
      gamePlayer.find({}, (err, res) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }
} // END CLass Game

// Export
module.exports = Player;
