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

  // Take Query results and according to scores calculates winning averate and save in array
  getRankingPlayer: async (docs) => {
    console.log("Dentro getRankng Player")
    let rankingPlayer = { nickName: undefined, rounds: undefined, average: 100 };
    console.log("Ranking worst1: " + JSON.stringify(rankingPlayer))
    docs.forEach((player) => {
      let games = player.games;
      if (games.length === 0) {
        return;
      }
      const result = games.filter((game) => game.score > 7);
      // result contain winning games.
      let average = Math.floor((result.length * 100) / games.length);
      if (average < rankingPlayer.average) {
        rankingPlayer = {
          nickName: player.nickName,
          rounds: game.length,
          average: average,
        };
      }
      console.log("Ranking worst: " + JSON.stringify(rankingPlayer))

    });
    // Format ranking average to string
    rankingPlayer.average = +rankingPlayer.average + "%";
    console.log("Ranking final: " + JSON.stringify(rankingPlayer))

    return rankingPlayer;
  },
};
