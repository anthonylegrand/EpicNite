const mongoose = require("mongoose");

const GameTypeEnum = ["MinerTycoon"];

const GamesDataSchema = new mongoose.Schema({
  GameType: {
    type: String,
    enum: GameTypeEnum,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

module.exports.GameTypeEnum = GameTypeEnum;
module.exports = GamesDataSchema;
