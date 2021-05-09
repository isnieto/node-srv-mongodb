// SERVER: App entry point
const app = require("./app");
// SERVER: port variable
const { PORT } = require("./config/index.js");
// Confirm connection
const conn = require("./config/db.connection")
// IMport app module
require("./api/game.routes.js")(app);


// Listen to server and connection established
app.listen(PORT, () => {
  console.log("Server started and running on port: " + PORT);
  if (conn){
    console.log("MongoDB database connection established succesfully")
  }
});


