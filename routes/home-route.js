//require Router to use routing system
const { Router } = require("express");

//controler
const { getHomePage } = require("../controler/home-controler");

//create Router
const router = new Router();

router.get("/", getHomePage);

module.exports = router;
