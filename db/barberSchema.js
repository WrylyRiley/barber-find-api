// connect to database
const mongoose = require('./connection')

// create review schema key value pairs
const ReviewSchema = new mongoose.Schema({
  text: String,
  firstname: String,
  lastname: String
})

// create review schema
const Review = mongoose.model('Review', ReviewSchema)

// create barber schema key value pairs
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

// create barber schema
const Barber = mongoose.model('Barber', BarberSchema)

// export barber Schema
module.exports = Barber
