var mongoose = require('../connection');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  name: String,
  address: String
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
