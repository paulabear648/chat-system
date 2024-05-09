const express = require("express");

const registerController = require("../controller/register.controller");
const router = express.Router();

router.get("/register", registerController.index);

router.post("/register", registerController.registerEmployee);

module.exports = router;
