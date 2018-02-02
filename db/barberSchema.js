const mongoose = require('./connection')

const ReviewSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  text: String
})

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
  reviews: [ReviewSchema]
})

const Barber = mongoose.model('Barber', BarberSchema)

module.exports = Barber
