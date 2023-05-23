const mongoose = require('mongoose');
const songDetails = mongoose.Schema({
  songname: String,
  film: String,
  music_director: String,
  singer: String,
  actor: String,
  actress: String,
});

module.exports = mongoose.model('songdetails', songDetails);
