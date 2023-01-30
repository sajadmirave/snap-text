//load dashboard page
const getDashBoardPage = (req, res) => {
  
  if (req.user.role === "77913805810") {
    res.render("dashboard", {
      user_name: req.user.name,
      pageTitle: "Dashboard",
      user: req.user,
      admin: true,
    });

    return;
  }

  res.render("dashboard", {
    user_name: req.user.name,
    pageTitle: "Dashboard",
    user: req.user,
    admin: false,
  });
};

module.exports = {
  getDashBoardPage,
};
