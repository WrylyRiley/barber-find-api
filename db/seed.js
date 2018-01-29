const Post = require("./models/post")
const seedData = require('./seeds.json')

Post.remove({})
    .then(_ => {
        return Post.collection.insert(seedData)
    })
    .then(_ => { 
        process.exit()
    })
 