const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userId: Number,
  game: String,
  playTime: Number,
  genre: String,
  platforms: [String],
});

const Game = mongoose.model('Game', gameSchema);

module.exports = { Game };