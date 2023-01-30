const mongoose = require("mongoose");

const postScema = mongoose.Schema({
  post: { type: String, required: true },
});

// create collection
const Post = mongoose.model("post", postScema);

new Post({
  post: "Fuck dude, im losing my mind...",
  post: "life is fucking short",
}).save();

module.exports = Post;
