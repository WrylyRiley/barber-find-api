const mongoose = require('./connection')

const ReviewSchema = new mongoose.Schema({
  text: String,
  firstname: String,
  lastname: String
})

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review
