// Bring Mongoose into the app
const mongoose = require("mongoose");

// Build the connection string
const mongoURI = "mongodb://localhost:27017/animals";
//mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Cat = mongoose.model("Cat", { name: String });

const kitty = new Cat({ name: "Zildjian" });
kitty.save().then(() => console.log("meow"));

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection open to " + mongoURI);
});
/*   
// If the connection throws an error
mongoose.connection.on('error',function (err) { 
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () { 
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {   
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});  */
