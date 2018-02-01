var mongoose = require('../connection')
var Schema = mongoose.Schema

var VideoSchema = new Schema({
  category: String,
  videoID: String,
  source: String
})

var video = mongoose.model('Video', VideoSchema)

module.exports = video
