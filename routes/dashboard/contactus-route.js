const { Router } = require("express");

const router = new Router();

//controler
const {
  getContactUsPage,
  addMessage,
} = require("../../controler/contactus-controler");

const { auth } = require("../../middleware/auth");

router.get("/user/dashboard/contactus",  getContactUsPage);

router.post("/user/dashboard/contactus",  addMessage);

module.exports = router;
