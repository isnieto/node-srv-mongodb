// Load plyaer model to check databasae
const Player = require("../models/player.model.js");

// Random a number between 0 and 12. Equal or more than 7 wins.
const gameplay = async () => {
  return Math.floor(Math.random() * 12);
};

module.exports = gameplay;
