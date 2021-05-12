// Setting route controllers for all endpoint of th app
const gameController = require("./game.controller.js");

module.exports = (app) => {
  

  // ADD  a new player
  app.post("/players", gameController.createOne);

  // Modify player name
  app.put("/players", gameController.updateOne);
  
  // Delete a Player with playerId
  app.delete("/players/:playerId/games", gameController.deletePlayerById);

  // Play one Game
  app.post("/players/:playerId/games/", gameController.playOneGame);

  // Retrieve all players from database FALTA percentage mig
  app.get("/players/", gameController.findAll);

  // Retrieve all scores from one player.
  app.get("/players/:playerId/games", gameController.findOne);

  // Retrieve average ranking of all  players
  app.get("/players/ranking/all", gameController.findRanking);

  // Retrieve worst player
  app.get("/players/ranking/loser", gameController.findWorst);

  // Retrieve worst player
  app.get("/players/ranking/best", gameController.findBest);

 

  // Page not available
  app.all("*", (req, res) => {
    res.status(404).send("ERROR 404. This page is not available.");
  });
};
