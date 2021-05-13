// Load modules: model for database and functions for the gameplay
const GamePlayer = require("./gameplay.model.js");
const Services = require("../services/games.services");

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
      const docs = await GamePlayer.find(
        {},
        { _id: 0, playerId: 1, nickName: 1, games: { score: 1, gameDate: 1 } }
      );
      const results = await Services.getRanking(docs);
      // If no data in database
      if (Object.keys(docs).length === 0) {
        return "No data found!";
      }
      return results;
    } catch (error) {
      return error;
    }
  }

  // Retrieve Ranking of worst player
  static async findWorstPlayer() {
    try {
      const docs = await GamePlayer.find(
        {},
        { _id: 0, playerId: 1, nickName: 1, games: { score: 1 } }
      );
      const results = await Services.getRankingPlayer(docs);
      // If no data in database
      if (Object.keys(docs).length === 0) {
        return "No data found!";
      }
      return results;
    } catch (error) {
      return error;
    }
  }

    // Retrieve Ranking of Best player
    static async findBestPlayer() {
      try {
        const docs = await GamePlayer.find(
          {},
          { _id: 0, playerId: 1, nickName: 1, games: { score: 1 } }
        );
        console.log("hasta aqui");
        const results = await Services.getRankingPlayer(docs, true);
        // If no data in database
        if (Object.keys(docs).length === 0) {
          return "No data found!";
        }
        return results;
      } catch (error) {
        return error;
      }
    }
} // END CLass Game

// Export
module.exports = Player;
