// You don't need hbs or methodOverride in an API. I commented the lines which aren't contributing to your API.

// import dependencies
const express = require('express')
// const hbs = require('express-handlebars')
const parser = require('body-parser')
// const methodOverride = require('method-override')
const cors = require('cors')()

// initialize server
const app = express()

// set server to use dependencies
// app.use(methodOverride('_method'))
app.use(parser.urlencoded({extended: true}))
app.use(cors)
// app.set('view engine', 'hbs')

// set hbs
// app.engine('.hbs', hbs({
//   extname: '.hbs',
//   partialsDir: 'views/',
//   layoutsDir: 'views/',
//   defaultLayout: 'layout'
// }))

// import controller
const barbers = require('./controllers/barbers')

// set initial route to use controller
app.use('/', barbers)

// initalize port for server
app.set('port', process.env.PORT || 9000)

// listen to port
app.listen(app.get('port'), () => {
  console.log(`PORT: ${app.get('port')}`)
})
