const Barber = require('./models/barber')
const seedData = require('../src/utils.js')

Barber.remove({})
    .then(_ => {
      return Barber.collection.insert(seedData)
    })
    .then(_ => {
      process.exit()
    })
