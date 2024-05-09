const express = require("express");
const allChatController = require("../controller/allChat.controller");

const router = express.Router();

router.get("/all-chat", allChatController.index);

router.post("/all-chat", allChatController.addMessage);

module.exports = router;
