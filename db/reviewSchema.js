// set up connection
const mongoose = require('./connection')

// create schema key value pairs
const ReviewSchema = new mongoose.Schema({
  text: String,
  firstname: String,
  lastname: String
})

// create schema
const Review = mongoose.model('Review', ReviewSchema)

// export schema
module.exports = Review
