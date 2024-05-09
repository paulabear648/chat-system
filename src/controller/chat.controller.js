/*
 *const groupModel = require("../model/group.model");
 *const loginModel = require("../model/login.model");
 *const model = require("../model/chat.model");
 */
const groupMessageDb = require("../../db/groupMessageDatabase");
const employeeDb = require("../../db/employeeDatabase");

const groupDb = require("../../db/groupDatabase");

const chatController = {
  addMessage: async (req, res) => {
    console.log("POST /chat/message");
    if (typeof req.session.passport === "undefined") {
      return res.redirect("/login");
    }
    const userId = req.session.passport.user.id;
    const messages = await groupMessageDb.addGroupMessage(
      req.body.content,
      userId,
      req.params.id
    );
    res.redirect(`/chat/${req.params.id}`);
    return messages;
  },
  index: async (req, res) => {
    console.log("GET /chat");
    if (typeof req.session.passport === "undefined") {
      return res.redirect("/login");
    }
    const userId = req.session.passport.user.id;
    const messages = await groupMessageDb.selectGroupMessageById(req.params.id);
    const user = await employeeDb.selectIdAndName(userId);
    console.log(`chatController user:${JSON.stringify(user)}`);
    const userName = user[0].name;
    console.log(`chatController userName:${JSON.stringify(userName)}`);
    const name = await groupDb.selectGroupName(req.params.id);
    const groupName = name[0].name;
    console.log(`groupName${groupName}`);

    res.render("chat", {
      groupId: req.params.id,
      groupName,
      messages,
      userName,
    });
    return messages;
  },
  indexAll: (req, res) => {
    console.log("GET /chatAll");
  },

  /*
   *  DeleteTasks: async (req, res) => {
   *  console.log("POST /tasks/delete");
   *  await tasks.deleteTasks(Number(req.body.deleteRadio));
   *  res.redirect("/tasks");
   *  },
   *  updateTasks: async (req, res) => {
   *  console.log("POST /tasks/update");
   *  await tasks.updateTasks(
   *  Number(req.body.updateRadio),
   *  req.body.name,
   *  req.body.content,
   *  req.body.group,
   *  req.body.deadline
   *  );
   *  res.redirect("/tasks");
   *  },
   */
};

module.exports = chatController;
