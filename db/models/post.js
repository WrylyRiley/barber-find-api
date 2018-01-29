var mongoose = require('../connection');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  motto: String,
  description: String
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
