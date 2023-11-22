require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://BowEnder:${process.env.MONGO_PASS}@cluster0.0pbrmwn.mongodb.net/?retryWrites=true&w=majority`
);

require("./models/PlayerSchema");

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Erreur de connexion à la base de données:", error);
});

db.once("open", () => {
  console.log("Connexion à la base de données établie avec succès!");
});

module.exports = mongoose;
global.mongoose = mongoose;
