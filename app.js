const express = require("express");

//modules
//for read .env file
const bodyParse = require("body-parser");
const session = require("express-session");

// for saving session in database
const mongoose = require("mongoose");

//authentication and authorization
const passport = require("passport");

// send messages and render with out redirect
// the falsh is in = req.flash("key")
const flash = require("express-flash");
const MongoStore = require("connect-mongo")(session);
//end

// configuration

//@Desc read envirment variables
require("dotenv/config");

// @Desc authentication and authorization
require("./config/passport");
// end

//routes
const homeRoutes = require("./routes/home-route");
const singupRoutes = require("./routes/singup-route");
const loginRoutes = require("./routes/login-route");
const dashboardRoutes = require("./routes/dashboard/dashboard");
const adminRoutes = require("./routes/admin/index");
const contactusRoute = require("./routes/dashboard/contactus-route");
const exploreRoutes = require("./routes/explore-route")
const { countViews } = require("./middleware/views");

//create app
const app = express();

//middlewares
//session
app.use(
  session({
    secret: "secret-code",
    name: "snap-text",
    // Forces the session to be saved
    // back to the session store
    resave: false,

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: false,

    // save session in database
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// passport work with session
app.use(passport.initialize());
app.use(passport.session());

// use flash
app.use(flash());



/*
@Title urlencoded
@Desc when data send from url, the data coded.
with body parser we can encoded the data
*/
app.use(bodyParse.urlencoded({ extended: true }));

/* 
@title Set Ejs
@Desc to render ejs file in rotues
1=type,2=name
file names
*/
app.set("view engine", "ejs");
app.set("views", "views");

//set static files
app.use(express.static("public"));

// end
// custom middle ware

// @title Count Views
app.use(countViews)

// end

//use route
app.use(homeRoutes);
app.use(exploreRoutes)
app.use(singupRoutes);
app.use(loginRoutes);
app.use(dashboardRoutes);
app.use(contactusRoute);
app.use(adminRoutes);

// share app in server.js to create server
module.exports = app;
