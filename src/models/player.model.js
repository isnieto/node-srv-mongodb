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
    //console.log(player);
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
      let rows = await GamePlayer.find();
      // If no data in database
      if (Object.keys(rows).length === 0) {
        return "Database empty!";
      }
      return rows;
    } catch (error) {
      return error;
    }
  }

  // Check if PlayerNr already exists in database
  static async checkIfPlayerNr(number) {
    return new Promise((reject, resolve) => {
      let query = GamePlayer.where({ playerId: number });
      query.findOne(function (err, res) {
        // If Name no exists response is null, reject with false
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

  //Delete all score of a single player
  static async deleteGames(playerId) {
    try {
      const gamesToDelete = GamePlayer.find({ playerId: playerId });
      let res = await GamePlayer.updateOne(
        { playerId: playerId },
        { $set: { games: [] } }
      );
      return res;
    } catch (error) {
      return error;
    }
  }

  //Retrieve a single object
  static async findByNr(number) {
    try {
      let res = await GamePlayer.findOne(
        { playerId: number },
        {
          _id: 0,
          playerId: 1,
          nickName: 1,
          games: { score: 1, result: 1, gameDate: 1 },
        }
      );
      return res;
    } catch (error) {
      return error;
    }
  }

  // Retrieve Ranking of all players
  static async getRankingAll() {
    try {
      let rows = await GamePlayer.find(
        {},
        { _id: 0, playerId: 1, nickName: 1, games: { score: 1, gameDate: 1 } }, function (err, row) {
          let counter = 0;
          let games = null;
          row.forEach(r => {
            console.log("Players Name: " + r.nickName)
            console.log("juegos realizados " +  r.games.length)
            games = r.games;
            games.forEach(game => {if (game.score > 7) console.log("score "+ game.score)})
          })
      });
      // If no data in database
      //console.log(rows)
      if (Object.keys(rows).length === 0) {
        return "No data found!";
      }
      return rows;
    } catch (error) {
      return error;
    }
  }
} // END CLass Game

// Export
module.exports = Player;
