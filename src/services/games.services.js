module.exports = {
  // Random a number between 0 and 12. Equal or more than 7 wins.
  playGame: async () => {
    let score = Math.floor(Math.random() * 12);
    let state = score > 7 ? true : false;
    return [score, state];
  },

  // Take Query results and according to scores calculates winning average and save in array of results
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

  // Take Query results and according to parameters calculates worst and best average
  getRankingPlayer: async (docs, type = false) => {
    // if worstPlayer searched average starts with 0 otherwise with 100
    let rankingPlayer = { average: !type ? 0 : 100 };
    docs.forEach((player) => {
      let games = player.games;
      if (games.length === 0) {
        return;
      }
      // Filter winning games quantity.
      const result = games.filter((game) => game.score > 7);
      // Calculate  winning avergage games .
      let average = Math.floor((result.length * 100) / games.length);
      // if type true search for worst player otherwise for best
      if (type) {
        if (average < rankingPlayer.average) {
          rankingPlayer = {
            nickName: player.nickName,
            gamesPlayed: games.length,
            average: average,
          };
        }
      } else {
        if (average > rankingPlayer.average) {
          rankingPlayer = {
            nickName: player.nickName,
            gamesPlayed: games.length,
            average: average,
          };
        }
      }
    });
    // Format ranking average to string
    rankingPlayer.average = +rankingPlayer.average + "%";
    return rankingPlayer;
  },
};
