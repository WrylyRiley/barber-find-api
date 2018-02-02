// import dependencies
const express = require('express')
// set up router
const router = express.Router()

// import models
const mongoose = require('../db/models/barber')
const Barbers = mongoose.model('Barber')
const search = require('../src/search')

// get all barbers from database
router.get('/', (req, res) => {
  Barbers.find()
    .then(barber => res.json(barber))
    .catch(err => console.log(err))
})

// serach for barbers by zip code
router.post('/', (req, res) => {
  search(req.name, req.postalCode)
})

// find specific barber by id
router.get('/:id', (req, res) => {
  Barbers.findById(req.params.id)
    .then(barber => res.json(barber))
    .catch(err => console.log(err))
})

// update a barbers information
router.put('/:id', (req, res) => {
  Barbers.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(barber => {
      res.json(barber)
    })
    .catch(err => console.log(err))
})

// delete a barber
router.delete('./id', (req, res) => {
  Barbers.findOneAndRemove({ _id: req.params.id })
    .then(barber => {
      res.json(barber)
    })
    .catch(err => console.log(err))
})

// export router
module.exports = router
