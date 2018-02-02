// import dependencies
const express = require('express')
// set up router
const router = express.Router()

const Barbers = require('../db/barberSchema')
const Search = require('../src/search')

// get all barbers from database
router.get('/', (req, res) => {
  Barbers.find()
    .then(barber => res.json(barber))
    .catch(err => console.log(err))
})

// search for barbers by zip code
router.post('/', (req, res) => {
  let newData = Object.keys(req.body)[0]
  newData = JSON.parse(newData)
  Search(newData.name, newData.postalcode)
})

// find specific barber by id
router.get('/:id', (req, res) => {
  Barbers.findById(req.params.id)
    .then(barber => res.json(barber))
    .catch(err => console.log(err))
})

// update a barbers information
router.put('/:id', (req, res) => {
  let newData = Object.keys(req.body)[0]
  newData = JSON.parse(newData)
  Barbers.findOneAndUpdate({ _id: req.params.id }, newData, {
    new: true
  })
    .then(barber => {
      res.json(barber)
    })
    .catch(err => console.log(err))
})

// delete a barber
router.delete('/:id', (req, res) => {
  Barbers.findOneAndRemove({ _id: req.params.id })
    .then(barber => {
      res.json(barber)
    })
    .catch(err => console.log(err))
})

// export router
module.exports = router
