const mongoose = require('./connection')

const BarberSchema = new mongoose.Schema({
  name: String,
  address: String,
  postalcode: Number,
  hours: String,
  phone: String,
  city: String,
  state: String,
  website: String,
  rating: Number
})

const Barber = mongoose.model('Barber', BarberSchema)

module.exports = Barber
