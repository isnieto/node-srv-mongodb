// Random a number between 0 and 12. Equal or more than 7 wins.

module.exports = {
  playGame: async () => {
    let score = Math.floor(Math.random() * 12);
    let state = score > 7 ? true : false;
    return [score, state];
  },

  // Take Query results and according to scores calculates winning averate and save in array
  getRanking: async (docs) => {
    let ranking = [];
    docs.forEach((player) => {
      let games = player.games;
      if (games.length === 0) {
        ranking.push({
          nickName: player.nickName,
          average: "no game played",
        });
      }
      const result = games.filter((game) => game.score > 7);
      // result contain winning games.
      ranking.push({
        nickName: player.nickName,
        average: +Math.floor((result.length * 100) / games.length) + "%",
      });
    });
    return ranking;
  },
};
