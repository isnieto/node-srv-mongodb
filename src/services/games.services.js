// Random a number between 0 and 12. Equal or more than 7 wins.
exports.gameplay = async () => {
  return Math.floor(Math.random() * 12);
};

// count number of players to assign next id to player
exports.countplayers = async (connection) => {

    let counter = connection.count();
    return counter++;
}

//module.exports = gameplay;
