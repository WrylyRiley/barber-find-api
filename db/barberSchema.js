const mongoose = require('./connection')

const ReviewSchema = new mongoose.Schema({
  text: String,
  firstname: String,
  lastname: String
})

const Review = mongoose.model('Review', ReviewSchema)

const BarberSchema = new mongoose.Schema({
  name: String,
  address: String,
  postalcode: Number,
  hours: String,
  phone: String,
  city: String,
  state: String,
  website: String,
  rating: Number,
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
})

const Barber = mongoose.model('Barber', BarberSchema)

module.exports = Barber
