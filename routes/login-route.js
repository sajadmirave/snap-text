const { Router } = require("express");

//controler
const {
  getLoginPage,
  hanndleLogin,
  handleRememberMe,
} = require("../controler/user-controler");

//@type: using rotuer system
const router = new Router();

router.get("/user/login", getLoginPage);

router.post("/user/login", hanndleLogin, handleRememberMe);

module.exports = router;
