//modules
const bcrypt = require("bcryptjs");
//end

//model
const Message = require("../model/Message");
//end

const getContactUsPage = (req, res) => {
  res.render("contactus", {
    sendMessage: null,
  });
};

const addMessage = async (req, res) => {
  // get data from url
  const { subject, message } = req.body;

  //add to database
  const newMessage = new Message({
    name: req.session.passport.user.name,
    email: req.user.email,
    subject: subject,
    message: message,
  });

  //   save to database
  await newMessage.save();

  //   set flash when everything is goos
  req.flash("send-message", "Message Successfuly Sended...");

  //   render again this page(with flash)
  res.render("contactus", {
    sendMessage: req.flash("send-message"),
  });
};

module.exports = {
  getContactUsPage,
  addMessage,
};
