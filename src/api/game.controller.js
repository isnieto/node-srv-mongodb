const Player = require("../models/player.model.js");
const playGame = require("../services/games.services.js");

// Retrieve all games from the database.

module.exports = {
  // Create one player
  createOne: async (req, res) => {
    // if content empty or no content player saved as anonymus
    if (
      Object.keys(req.body).length === 0 ||
      req.body.name === "" ||
      req.body.name === " "
    ) {
      await Player.newPlayer("Anonimo").catch((e) => e);
      res.status(201).json({ message: "New player added as ANONIMUS" });
    } else {
      try {
        let checked = await Player.checkIfPlayerExists(req.body.name).catch(
          (e) => e
        );
        if (checked) {
          // Count number of players in DB to set playerId
          await Player.newPlayer(req.body.name);
          res.status(201).json({
            message: `New player '${req.body.name}' succesfully added in database.`,
          });
        } else {
          res.status(501).json({
            message: `Sorry, but player '${req.body.name}' already exists in database.`,
          });
        }
      } catch (e) {
        res.status(500).json({ message: e });
      }
    }
  },



  // Update name of player by ID
  updateOne: async (req, res) => {
    // if no playerid or empty return error.
    if (Object.keys(req.body).length === 0 || !req.params.playerId) {
      res.status(400).send({ message: "Sorry, playerNr needed to update!" });
    } else {
      try {
        // Check if playerid in database
        let checked = await Player.checkIfPlayerNr(req.params.playerId);
        if (checked === false) {
          res.status(400).json({ message: "Sorry, PlayerId is not correct." });
        } else {
          // Update playername
          let result = false;
          result = await Player.updateName(
            req.params.playerId,
            req.body.newName
          ).catch((e) => e);
          if (result) {
            res.status(201).json({
              message: `New name '${req.body.newName}' succesfully modify in database.`,
            });
          } else {
            res.status(404).json({
              message: "Sorry, Name could not be updated! Id not correct.",
            });
          }
        }
      } catch (e) {
        res.status(500).json({ message: e });
      }
    }
  },
  
  // Player plays a game
  playOneGame: async (req, res) => {
    // if no playerid or empty return error.
    if (Object.keys(req.body).length === 0 || !req.body.playerId) {
      res.status(400).send({ message: "Sorry, playerNr needed to update!" });
    } else {
      try {
        // Check if playerid in database
        let checked = await Player.checkIfPlayerNr(req.body.playerId).catch(
          (e) => e
        );
        if (checked === false) {
          res.status(400).json({ message: "Sorry, PlayerId is not correct." });
        } else {
          let playerId = req.body.playerId;
          let results = await playGame();
          await Player.addScore(playerId, results);
          res.status(201).json({ message: "New game added!" });
        }
      } catch (e) {
        res.status(404).json({ error: e });
      }
    }
  },

  // Delete one player by ID
  deletePlayerById: async (req, res) => {
    // Check if playerid in database
    if (!req.params.playerId) {
      res.status(400).send({ message: "Sorry, playerNr needed to update!" });
    } else {
      try {
        // Check if playerid in database
        let checked = await Player.checkIfPlayerNr(req.params.playerId).catch(
          (e) => e
        );
        if (checked === false) {
          res.status(400).json({ message: "Sorry, PlayerId is not correct." });
        } else {
          // Check if playerid in database
          const results = await Player.deleteGames(req.params.playerId);
          console.log("los results son " + results);
          res.status(200).json({
            data: results,
            message: `All games from playerID ${req.params.playerId} deleted`,
          });
        }
      } catch (e) {
        res.status(400).json({ message: e });
      }
    }
  },

  // Retrieve all players from database FALTA percentage mig
  findAll: async (req, res) => {
    try {
      let results = await Player.getAllPlayers();
      res.status(200).send(results);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  },

 //Retrieve a single object
 findOne: async (req, res) => {
  // if no playerid or empty return error.
  if (!req.params.playerId) {
    res.status(400).send({ message: "Sorry, playerNr needed to show data!" });
  } else {
    try {
      // Check if playerid in database
      let checked = await Player.checkIfPlayerNr(req.params.playerId).catch(
        (e) => e
      );
      if (checked === false) {
        res.status(400).json({ message: "Sorry, PlayerId is not correct." });
      } else {
        // Update playername
        let data = await Player.findById(req.params.playerId).catch((e) => e);
        if (data) {
          res.status(200).send(data);
        } else {
          res.status(404).json({
            message: "Sorry, Name could not be updated! Id not correct.",
          });
        }
      }
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }
},

  /*  


  // Retrieve a single player score list
  gamesAll: async (req, res) => {
    let playerIdExist = false;
    playerIdExist = await Player.checkIfIdExists(req.body.playerId).catch(
      (e) => e
    );
    if (!playerIdExist) {
      res.status(400).json({ message: "Sorry, PlayerId is not correct." });
    } else {
      try {
        const results = await Game.getAllScoresFromPlayer(req.body.playerId);
        res.status(200).json(results);
      } catch (e) {
        res.status(500).json({ message: e });
      }
    }
  },

  // Retrieve Ranking of all players
  findRanking: async (req, res) => {
    try {
      const results = await Game.getRanking();
      res.status(200).send(results);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  },

  // Retrieve best player
  findWorst: async (req, res) => {
    try {
      const results = await Game.findLoser();
      res.status(200).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Retrieve best player
  findBest: async (req, res) => {
    try {
      const results = await Game.findWinner();
      res.status(201).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

   */
}; // End Module
