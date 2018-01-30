const mongoose = require('./connection')

const BarberSchema = new mongoose.Schema({
  name: String,
  address: String
})

const Barber = mongoose.model('Barber', BarberSchema)

module.exports = Barber
