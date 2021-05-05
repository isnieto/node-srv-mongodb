
conn= new Mongo("localhost:27017");
dbo = conn.getDB("dadosgame");
dbo.dropDatabase();



dbo.createCollection("players", function(err, res) {
  if (err) throw err;
  console.log("Collection created!" + res);
}); 


use admin;
db.createUser({user:'userName', pwd:'password', roles:[
    {role:'readWrite', db:'dadosgame'}
]});