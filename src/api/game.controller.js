//const { restart } = require("nodemon");
const Game = require("../models/game.model.js");
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
      await Player.newPlayer("Anonimo");
      res.status(201).json({ message: "New player added as ANONIMUS" });
    } else {
      try {
        checked = await Player.checkIfPlayerExists(req.body.name).catch(
          (e) => e
        );
        if (checked) {
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
    if (Object.keys(req.body).length === 0 || !req.body.playerid) {
      res.status(400).send({ message: "Sorry, playerID needed to update!" });
    } else {
      try {
        // Check if playerid in database
        let idExist = false;
        idExist = await Player.checkIfIdExists(req.body.playerid).catch(
          (e) => e
        );
        if (!idExist) {
          res.status(400).json({ message: "Sorry, PlayerId is not correct." });
        } else {
          // Update playername
          let result = false;
          result = await Player.updateName(
            req.body.playerid,
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

  playOneGame: async (req, res, next) => {
    try {
      let playerId = req.params.playerId;
      let score = await playGame();
      await Game.addScore(playerId, score);
      res.status(201).json({ message: "New game added!" });
    } catch (e) {
      res.status(404).json({ error: e });
    }
  },

  findAll: async (req, res) => {
    try {
      const results = await Player.getAllPlayers();
      res.status(200).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  //Retrieve a single object
  findOne: async (req, res) => {
    try {
      const results = await Player.findById(req.params.playerId);
      res.status(200).send(results);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },

  // Retrieve a single player score list
  gamesAll: async (req, res) => {
    let playerIdExist = false;
    playerIdExist = await Player.checkIfIdExists(req.params.playerId).catch(
      (e) => e
    );
    if (!playerIdExist) {
      res.status(400).json({ message: "Sorry, PlayerId is not correct." });
    } else {
      try {
        const results = await Game.getAllScoresFromPlayer(req.params.playerId);
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

  // Delete one player by ID
  deleteAll: async (req, res) => {
    // Check if playerid in database
    let playerIdExist = false;
    playerIdExist = await Player.checkIfIdExists(req.params.playerId).catch(
      (e) => e
    );
    if (!playerIdExist) {
      res.status(400).json({ message: "Sorry, PlayerId is not correct." });
    } else {
      try {
        const results = await Game.deleteGames(req.params.playerId);
        res
          .status(200)
          .json({
            message: `All games from playerID ${req.params.playerId} deleted`,
          });
      } catch (e) {
        res.status(400).json({ message: e });
      }
    }
  },
}; // End Module
