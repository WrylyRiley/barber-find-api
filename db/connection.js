// import dependency
const mongoose = require('mongoose')

// start database connection
mongoose.connect('mongodb://localhost/barberhub', { useMongoClient: true })

// set up connection points
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MLAB_URL, { useMongoClient: true })
    .catch(err => console.log(err))
} else {
  mongoose.connect('mongodb://localhost/barberhub', { useMongoClient: true })
    .catch(err => console.log(err))
}

// set up promise
mongoose.Promise = Promise

// export connection
module.exports = mongoose
