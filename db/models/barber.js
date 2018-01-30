var mongoose = require('../connection')
var Schema = mongoose.Schema

var BarberSchema = new Schema({
  name: String,
  address: String,
  postalcode: Number,
  hours: String,
  reviews: {},
  phone: String,
  city: String,
  state: String,
  website: String,
  user: String
})

var barber = mongoose.model('Barber', BarberSchema)

module.exports = barber
