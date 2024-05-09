const express = require("express");

const isAuthenticated = require("../module/authenticate");
const loginController = require("../controller/login.controller");
const router = express.Router();

router.get("/login", isAuthenticated, (req, res) => {
  res.redirect("/groups");
});

router.get("/login", loginController.index);

router.post(
  "/login",
  express.urlencoded({ extended: true }),
  loginController.login
);

module.exports = router;
