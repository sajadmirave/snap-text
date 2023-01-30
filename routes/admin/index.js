const { Router } = require("express");

//controler
const {
  getAdminPage,
  getUsers,
  deleteUser,
  getDeletePage,
  getMessagesPage,
  getAddPostPage,
  addPost,
} = require("../../controler/admin-controler");

// middlewares
const { auth } = require("../../middleware/auth");
const { authAdmin } = require("../../middleware/authAdmin");

const router = new Router();

// general middleware for protect all admin routes
router.use(auth, authAdmin);

router.get("/admin", getAdminPage);

router.get("/admin/users", getUsers);

router.get("/admin/user/delete", getDeletePage);

router.post("/admin/users/delete", deleteUser);

router.get("/admin/messages", getMessagesPage);

router.get("/admin/addpost", getAddPostPage);

router.post("/admin/addpost", addPost);

module.exports = router;
