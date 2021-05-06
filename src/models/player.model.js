//  Import db.connection and Mysql Queries
const connection = require("../config/db.connection.js");

//  Player class and use the database connection above to add  CRUD methods:
class Player {
  constructor(playerName) {
    this.nickName = playerName;
  }

  // Check if PlayerName already exists in database
  static checkIfPlayerExists(playerName) {
    return new Promise((reject, resolve) => {
      mysql.query(queries.searchByName(playerName), (err, res) => {
        // If Name no exists response is false
        if (err || res.length !== 0) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  

  // Create new Player [ IN PROCESS ]
  static async newPlayer(playerName) {
    mysql.query(queries.createNewPlayer(playerName), (err, res) => {
      if (err) {
        return err;
      }
      return res;
    });
  }

  
} // END CLass Game

// Export
module.exports = Player;
