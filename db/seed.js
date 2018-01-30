<<<<<<< HEAD
const Barber = require('./schema')
const seedData = require('../src/data')

console.log(seedData)
=======
const Barber = require('./models/barber')
const seedData = require('../src/utils.js')

>>>>>>> dev
Barber.remove({})
    .then(_ => {
      return Barber.collection.insert(seedData)
    })
    .then(_ => {
      process.exit()
    })
