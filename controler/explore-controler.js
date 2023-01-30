//model
const Post = require("../model/Post");

const getExplorePage = async (req, res) => {
  //find all post in database and show in this page(explore)
  const post = await Post.find();

  res.render("explore", {
    user: req.user,
    post: post,
  });
};

module.exports = {
  getExplorePage,
};
