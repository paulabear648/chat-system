const express = require("express");

const router = express.Router();

const logoutController = require("../controller/logout.controller");

router.post("/logout", logoutController.logout);

module.exports = router;
