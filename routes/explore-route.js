const { Router } = require("express");

const router = new Router();

const { getExplorePage } = require("../controler/explore-controler");

router.get("/explore", getExplorePage);

module.exports = router;
