/*
singup
validate
login
remember me
*/

//modules
const yup = require("yup");
const bcrypt = require("bcryptjs");
//end

// model
const User = require("../model/User");
const passport = require("passport");

//check with yup
const yupValidator = {
  email: yup.string().email().required(),
  password: yup.string().required().min(5).max(22),
};

// create yup scema
const yupScema = yup.object().shape(yupValidator);

//load singup page
const getSingUpPage = (req, res) => {
  res.render("singup", {
    // null errors when page loaded
    error: [],
  });
};

//sing up user
const addUser = async (req, res) => {
  //get data from inputs
  const { name, email, password } = req.body;

  //find email in databse
  const user = await User.findOne({ email });

  if (user) {
    res.render("singup", {
      error: ["email must be unique"],
    });
    return;
  }

  //   create user in function
  const createUser = async () => {
    // hash password
    // 1arg = hash, 2arg = salt for count of hashing
    let hashedPassword = await bcrypt.hash(password, 12);

    //add user
    let newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    //   save into databse
    await newUser.save();
  };
  // end

  yupScema
    .validate(req.body)
    .then((resualt) => {
      //log resualt
      console.log(resualt);

      //call create user in here when everything is good
      createUser();

      // send flash to login page when user is singuped
      req.flash("success-singup", "singup successfuly...");
      //   when user is singup then redirect into login page
      res.redirect("/user/login");
    })
    // when singup fail
    .catch((err) => {
      console.log(err);
      // errors in err.errors
      res.render("singup", {
        error: err.errors,
        email: req.flash("emailUnique"),
      });
    });
};

//login
const getLoginPage = (req, res) => {
  res.render("login", {
    error: req.flash("error"),
    successLogin: req.flash("success-singup"),
    logout: req.flash("logout"),
  });
};

const hanndleLogin = (req, res, next) => {
  passport.authenticate("local", {
    failureRedirect: "/user/login",

    // success redirect into next middleware
    // successRedirect: "/user/dashboard",

    /*
    @title: error message (flash)
    @Decs:
    if true the message we set in passport.js will show 
    the message in req.flash with key = "error"
    on the top, on getLoginPage we send error message to ejs file
    */
    failureFlash: true,
  })(req, res, next);
};

const handleRememberMe = (req, res) => {
  if (req.body.rememberme) {
    req.session.cookie.originalMaxAge = 604800000; //7 days
  } else {
    req.session.cookie.expire = null;
  }

  res.redirect("/user/dashboard");
};

const hanndleLogOut = (req, res, next) => {
  req.logOut(function (err) {
    if (err) return next(err);
  });

  req.flash("logout", "logout successfuly...");
  res.render("login", {
    successLogin: null,
    error: req.flash("error"),
    logout: req.flash("logout"),
  });
};

module.exports = {
  getSingUpPage,
  addUser,
  getLoginPage,
  hanndleLogin,
  handleRememberMe,
  hanndleLogOut,
};
