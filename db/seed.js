const Barber = require('./schema')
const seedData = require('../src/data')

console.log(seedData)
Barber.remove({})
    .then(_ => {
      return Barber.collection.insert(seedData)
    })
    .then(_ => {
      process.exit()
    })
