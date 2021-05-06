// SERVER: App entry point
const app = require("./app");

// SERVER: port variable
const { PORT } = require("./config/index.js");

require("./routes/game.routes.js")(app);

app.listen(PORT, () => {
  console.log("Server started and running on port: " + PORT);
});


