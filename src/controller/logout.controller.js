const logoutController = {
  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        next(err);
      }
      res.redirect("/login");
    });
  },
};

module.exports = logoutController;
