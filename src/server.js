// SERVER: App entry point
const app = require("./app");
const conn = require("./config/db.connection")

// SERVER: port variable
const { PORT } = require("./config/index.js");

require("./routes/game.routes.js")(app);

app.listen(PORT, () => {
  console.log("Server started and running on port: " + PORT);
  if (conn){
    console.log("MongoDB database connection established succesfully")
  }
});


