const Views = require("../model/Views");

const countViews = async (req, res, next) => {
  let views = 1;

  const view = new Views({
    views: views,
  });

  await view.save();

  next();
};

module.exports = {
  countViews,
};
