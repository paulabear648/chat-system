const express = require("express");
const positionController = require("../controller/position.controller");

const router = express.Router();

router.get("/positions", positionController.index);

router.post("/positions", positionController.updatePosition);

module.exports = router;
