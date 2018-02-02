// initialize database connection
var mongoose = require('../connection')
// set up schema
var Schema = mongoose.Schema

// create schema key value pairs
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

// create schema
var barber = mongoose.model('Barber', BarberSchema)

// export schema
module.exports = barber
