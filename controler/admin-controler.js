//model
const { default: mongoose } = require("mongoose");

// models
const User = require("../model/User");
const Views = require("../model/Views");
const Messages = require("../model/Message");
const Post = require("../model/Post");

const bcrypt = require("bcryptjs");

// load page
// method : post
const getAdminPage = async (req, res) => {
  //find in database
  const user = await User.find();

  //find views
  let view = await Views.find();

  //   count of user
  // we are sending all data to client and then in ejs, loop on array
  //   for(let x = 0 ; x < user.length; x++){
  //     console.log(x)
  //   }

  // user.length()
  let viewsLength = view.length;

  // load page
  res.render("./admin/index.ejs", {
    user: user.length,

    // in every record we have 1 views, so length is equal record
    views: viewsLength,
  });
};

const getUsers = async (req, res) => {
  // @Desc send user data to admin pannel
  // find in database
  const user = await User.find();

  //   load page
  res.render("./admin/users", {
    userList: user,
  });
};

const getDeletePage = (req, res) => {
  res.render("./admin/delete-user", {});
};

const deleteUser = (req, res) => {
  const { email } = req.body;

  User.remove({ email: email }, (err, resualt) => {
    if (err) return console.log(err);

    res.redirect("/admin");
  });
};

const getMessagesPage = async (req, res) => {
  //find message in databse
  const message = await Messages.find();

  //send message to client and over ther, loop on message

  res.render("./admin/messages", {
    message: message,
  });
};

const getAddPostPage = (req, res) => {
  res.render("./admin/addpost", {
    successAddPost:null
  });
  
};

const addPost = async (req, res) => {
  // add post to dbs
  //and show posts in explore

  // get data from url(form)
  const { message } = req.body;

  //add to database
  const newPost = new Post({
    post: message,
  });

  // save to model
  await newPost.save();

  // set flash when everythin is good
  req.flash("PostAdd", "Post SuccessFuly Added...");

  // render again page with flash
  res.render("./admin/addpost", {
    successAddPost: req.flash("PostAdd"),
  });
};

module.exports = {
  getAdminPage,
  getUsers,
  getDeletePage,
  deleteUser,
  getMessagesPage,
  getAddPostPage,
  addPost,
};
