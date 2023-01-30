//require Router to use routing system
const { Router } = require("express");

//controler
const { getSingUpPage, addUser } = require("../controler/user-controler");

//create Router
const router = new Router();

router.get("/user/singup", getSingUpPage);

router.post("/user/singup", addUser);

module.exports = router;
