const mongoose = require("mongoose");

const GameTypeEnum = require("./GamesDataSchema").GameTypeEnum;

const GamesHistorySchema = new mongoose.Schema({
  GameType: {
    type: String,
    enum: GameTypeEnum,
    required: true,
  },
  islandId: {
    type: String,
    required: true,
    minlength: 32,
    maxlength: 32,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = GamesHistorySchema;
