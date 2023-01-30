const app = require("./app");
const mongoose = require("mongoose");

// configuration
require("dotenv/config");
// end

//create server

//port(read from .env file)
const port = process.env.PORT;

// mongo uri for connected(read from .env file)
const mongo_url = process.env.MONGO_URL;
//connect to mongodb(databse)
mongoose
  .connect(mongo_url)
  .then(() => {
    //connected successfuly
    console.log("database connected...");
    //run server
    app.listen(port, () => console.log(`server is running on port ${port}`));

    //   log error
  })
  .catch((err) => console.log(err));
