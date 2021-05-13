const players = [ { nickName: "anonimo", games: []},{ nickName: "fulanito", games: [{"score": 11}, {"score": 12 }] }, { nickName: "menganito", games: [{"score": 11}, {"score": 1 }] }, { nickName: "alfonsito", games: [{"score": 3}, {"score": 12 }, {"score": 1}, {"score": 6}] }] ;

const ranking = (docs) => {
    let rankingPlayer = { nickName: undefined, average: 100 };
    
    docs.forEach((player) => {
      
      let games = player.games;
      if (games.length === 0) {
        return
      }
      const result = games.filter((game) => game.score > 7);
      // result contain winning games.
     let average = Math.floor((result.length * 100) / games.length);
      console.log(player.nickName, average)
      if (average < rankingPlayer.average) {
        rankingPlayer = {
          nickName: player.nickName,
          average: +average + "%",
        };
      }
    }); 
    console.log(rankingPlayer);
  }

ranking(players)