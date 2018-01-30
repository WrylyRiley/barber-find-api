const Barber = require('./schema')
const seedData = require('./seeds.json')

Barber.remove({})
    .then(_ => {
      return Barber.collection.insert(seedData)
    })
    .then(_ => {
      process.exit()
    })
