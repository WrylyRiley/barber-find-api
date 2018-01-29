const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const morgan = require('morgan')

const app = express()

var Posts = require('../db/models/post')

// app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Disabled caching I think? DBs fetched weren't updating Vue, so I had to add this.
app.disable('etag')

app.get('/', (req, res) => {
  // res.send({ message: 'hello from the server!' })
  res.send({ msg: 'Hello from the backend!' })
})

app.get('/posts', (req, res) => {
  Posts.find({})
    .then(posts => {
      res.send(posts)
    })
    .catch(err => {
      console.log(err)
    })
})

// make this a modal with vuetify
app.post('/posts', (req, res) => {
  Posts.create(req.body)
    .then(res.send({ msg: 'Success' }))
    .catch(err => {
      console.log(err)
    })
})

app.get('/posts/:id', (req, res) => {
  Posts.findById(req.params.id, (error, post) => {
    if (error) {
      console.log(error)
    }
    res.send(post)
  })
})

app.put('/posts/:id', (req, res) => {
  Posts.findOneAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      motto: req.body.motto,
      description: req.body.description
    }
  )
    .then(res.send({ msg: 'Success' }))
    .catch(err => {
      console.log(err)
    })
})

app.delete('/posts/:id', (req, res) => {
  Posts.findOneAndRemove({ _id: req.params.id }, (error, post) => {
    if (error) {
      console.log(error)
    }
  }).then(res.send({ msg: 'Success' }))
})

app.set('port', process.env.PORT || 8082)

app.listen(app.get('port'), () => {
  console.log(`PORT: ${app.get('port')}`)
})
