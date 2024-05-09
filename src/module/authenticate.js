const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
    return;
  }
  next("route");
};

module.exports = isAuthenticated;
