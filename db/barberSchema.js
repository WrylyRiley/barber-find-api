// connect to database
const mongoose = require('./connection')

// create review schema key value pairs
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

// create barber schema
const Barber = mongoose.model('Barber', BarberSchema)

// export barber Schema
module.exports = Barber
