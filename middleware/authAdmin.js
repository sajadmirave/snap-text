const authAdmin = (req, res, next) => {
  
  if (req.user.role === "77913805810") {
    req.body.email
    next();
    return 
  }

  res.redirect("/user/login");
};

module.exports = {
  authAdmin,
};
