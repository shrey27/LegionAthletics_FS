const mongoose = require('mongoose');
const VideoSchema = new mongoose.Schema({
  _id: String,
  viewCount: Number,
  comments: Array,
  videoDate: String,
  title: String,
  creator: String,
  video: String,
  category: String,
  description: String
});
const Video = mongoose.model('Video', VideoSchema);

module.exports = { Video };
