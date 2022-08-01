const mongoose = require('mongoose');
const VideoUserSchema = new mongoose.Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  likes: Array,
  history: Array,
  playlists: Array,
  watchlater: Array
});
const VideoUser = mongoose.model('videouser', VideoUserSchema);

module.exports = { VideoUser };
