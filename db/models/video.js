// import database connection
var mongoose = require('../connection')

// set up schema variable
var Schema = mongoose.Schema

// create schema key value pairs
var VideoSchema = new Schema({
  category: String,
  videoID: String,
  source: String
})

// create schema variable
var video = mongoose.model('Video', VideoSchema)

// export schema
module.exports = video
