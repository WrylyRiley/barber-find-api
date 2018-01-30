const express = require('express')
const Barber = require('../db/schema')

const router = express.Router()

router.get('/', (req, res) => {
  Barber.find({})
    .then((barber) => {
      res.render('data', {
        barber: barber
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
