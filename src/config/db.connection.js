// Create database connection
const mongoose = require("mongoose");
const mongoUri = require("./db.config");

const connection = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

if (connection) {
  console.log("Conection established with " + JSON.stringify(mongoUri));
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
  console.log('connected'); // si esta todo ok, imprime esto
});

module.exports = connection;
