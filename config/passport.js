const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../model/User");

const passportCheck = async (email, password, done) => {
  try {
    /*
    @title: done
    @Desc: 
    send request with done
    the firs argument is error, if null we can send custom error
    second argument is sending data. in here we are send user data.
    data is in rea.user
    */

    //find use in databse
    const user = await User.findOne({ email });

    //if user not valid
    if (!user) return done(null, false, { message: "User Not Found" });

    //compare hash password for checking in here
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return done(null, false, { message: "Password Or Email Not Valid" });

    done(null, user); //data in res.user

    // error
  } catch (error) {
    console.log(error);
  }
};

passport.use(new LocalStrategy({ usernameField: "email" }, passportCheck));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
