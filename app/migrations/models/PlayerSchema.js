const mongoose = require("mongoose");

const GamesDataSchema = require("./GamesDataSchema");
const GamesHistorySchema = require("./GamesHistorySchema");

const playerSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
    },
    epicID: {
      type: String,
      required: true,
      minlength: 26,
      maxlength: 26,
    },
    gamesData: [GamesDataSchema],
    gamesHistory: [GamesHistorySchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
