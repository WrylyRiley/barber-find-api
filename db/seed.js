const Barber = require('./schema')
const seedData = require('../src/Utils')

Barber.remove({})
    .then(_ => {
      return Barber.collection.insert(seedData)
    })
    .then(_ => {
      process.exit()
    })
