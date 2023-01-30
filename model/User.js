const mongoose = require("mongoose");

// access to the scecial page(admin,auth,explore)
const role = {
  user: "175097385112",
  admin: "77913805810",
};

// create scema
const userScema = mongoose.Schema({
  name: { type: String, trim: true , required:true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateJoin: { type: Date, default: Date.now },
  role: { type: String, default: role.user },
});

// model (collection in mongodb)
// 1arg = model name, 2arg = scema
const User = mongoose.model("user", userScema);

module.exports = User;
