const { Router } = require("express");

// controlers
const { getDashBoardPage } = require("../../controler/dashboard-controler");
const { hanndleLogOut } = require("../../controler/user-controler");

//auth middle ware to protect route
const { auth } = require("../../middleware/auth");

// use routing system with Express.Router
const router = new Router();

/*
@method get
@title  dashboard page
@Desc load dashboard page,
only authentication user access to this page, 
*/
router.get("/user/dashboard", auth, getDashBoardPage);

// =====================================================

// =====================================================

/*
@method post
@title logout user
@Desc delete session with passport to logout user
*/
router.post("/user/logout", hanndleLogOut);

module.exports = router;
