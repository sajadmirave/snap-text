// contact us

const mongoose = require("mongoose");

const messageScema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

const Message = mongoose.model("Message", messageScema);

module.exports = Message;
