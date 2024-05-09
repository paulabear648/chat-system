const express = require("express");
const chatController = require("../controller/chat.controller");

const router = express.Router();

router.get("/chat/:id", chatController.index);
router.get("/ch", (req, res) => {
  if (typeof req.session.passport !== "undefined") {
    res.send(req.session.passport.user.id);
  }
  res.send("nothing");
});
router.get("/chatAll", chatController.indexAll);

router.post("/chat/message/:id", chatController.addMessage);

module.exports = router;
