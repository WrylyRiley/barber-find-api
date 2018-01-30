const express = require('express')
const hbs = require('express-handlebars')
const parser = require('body-parser')
const methodOverride = require('method-override')

const app = express()

app.use(methodOverride('_method'))
app.use(parser.urlencoded({extended: true}))
app.set('view engine', 'hbs')

app.engine('.hbs', hbs({
  extname: '.hbs',
  partialsDir: 'views/',
  layoutsDir: 'views/',
  defaultLayout: 'layout'
}))

const barbers = require('./controllers/barbers')

app.use('/', barbers)

app.set('port', process.env.PORT || 9000)

app.listen(app.get('port'), () => {
  console.log(`PORT: ${app.get('port')}`)
})
