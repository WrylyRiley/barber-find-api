const express = require('express')
const router = express.Router()

const mongoose = require('../db/schema')
const Barbers = mongoose.modle('Barber')

router.get('/', (req, res) => {
  Barbers.find()
    .then(barber => res.json(barber))
    .catch(err => console.log(err))
})

module.exports = router
