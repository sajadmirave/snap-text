const mongoose = require("mongoose");

const viewsScema = mongoose.Schema({
  views: { type: Number, required: true },
});

const Views = mongoose.model("views", viewsScema);

module.exports = Views;
