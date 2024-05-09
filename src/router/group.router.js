const express = require("express");

const router = express.Router();

const groupController = require("../controller/group.controller");

router.get("/groups", groupController.index);

router.get("/group/addition", groupController.indexAdd);

router.post("/group/addition", groupController.addGroup);

module.exports = router;
