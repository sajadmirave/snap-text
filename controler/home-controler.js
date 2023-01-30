const getHomePage = async (req, res) => {
  console.log(res.views);

  res.render("home", {
    //dynamic variable
    title: "Snap-Text",
    user: req.user,
  });
};

module.exports = {
  getHomePage,
};
