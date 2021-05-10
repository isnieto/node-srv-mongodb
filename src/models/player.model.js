// Load modules: model for database and functions for the gameplay
const GamePlayer = require("./gameplay.model.js");
const conn = require("../config/db.connection");

//  Player class and use the database connection above to add  CRUD methods:
class Player {
  constructor(playerName) {
    this.nickName = playerName;
  }

  // Check if PlayerName already exists in database
  static checkIfPlayerExists(playerName) {
    return new Promise((reject, resolve) => {
      GamePlayer.find({ nickName: `${playerName}` }, (err, res) => {
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
    const player = new GamePlayer({
      playerId: (await GamePlayer.find().countDocuments()) + 1, // add user index
      nickName: `${playerName}`,
    });
    console.log(player);
    try {
      const res = await player.save();
      return res;
    } catch (error) {
      return error;
    }
  }

  // Retrieve list of all players
  static async getAllPlayers() {
    try {
      let res = await GamePlayer.find({});
      return res;
    } catch (error) {
      return error;
    }
  }

  // Check if PlayerNr already exists in database
  static async checkIfPlayerNr(number) {
    return new Promise((reject, resolve) => {
      let query = GamePlayer.where({ playerId: number });
      query.findOne(function (err, res) {
        // If Name no exists response is false
        if (err || res === null) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  // Modify Name of a player
  static async updateName(playerId, newName) {
    try {
      let res = GamePlayer.updateOne(
        { playerId: playerId },
        { $set: { nickName: newName } }
      );
      return res;
    } catch (error) {
      return error;
    }
  }

  // Player plays one Game
  static async addScore(playerId, results) {
    try {
      const scores = { score: results[0], result: results[1] };
      let res = GamePlayer.updateOne(
        { playerId: playerId },
        { $push: { games: scores } }
      );
      return res;
    } catch (error) {
      return error;
    }
  }

  //Retrieve a single object
  static async findById(playerId) {
    try {
      let res = await GamePlayer.findOne({ playerId: playerId });
      return res;
    } catch (error) {
      return error;
    }
  }
  
  //Delete all score of a single player
  static async deleteGames(playerId) {
    try {
      const gamesToDelete = GamePlayer.find({ playerId: playerId });
      let res = await  GamePlayer.updateOne(
        { playerId: playerId },
        { $set: { games: [] } }
      );
      return res;
    } catch (error) {
      return error;
    }
  }

  //Retrieve a single object
  static async findById(playerId){
    try {
      let res = await GamePlayer.findOne({playerId: playerId});
      return res;
    } catch (error) {
      return error;
    }
  }



} // END CLass Game

// Export
module.exports = Player;
