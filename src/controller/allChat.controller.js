const allMessageDatabase = require("../../db/allMessageDatabase");
const employeeDatabase = require("../../db/employeeDatabase");

const allChatController = {
  index: async (req, res) => {
    let name = "error";
    if (typeof req.session.passport === "undefined") {
      return res.redirect("/login");
    }
    name = await employeeDatabase.selectNameById(req.session.passport.user.id);
    const userName = name.name;
    const messages = await allMessageDatabase.selectEntireMessage();
    return res.render("all-chat", { messages, userName });
  },
  addMessage: async (req, res) => {
    if (typeof req.session.passport === "undefined") {
      return res.redirect("/login");
    }
    const { content } = req.body;
    await allMessageDatabase.addMessage(content, req.session.passport.user.id);
    return res.redirect("/all-chat");
  },
};

module.exports = allChatController;
