const groupDatabase = require("../../db/groupDatabase");
const employeeDb = require("../../db/employeeDatabase");

const groupController = {
  addGroup: async (req, res) => {
    await groupDatabase.insert(req.body.groupName, "group");
    res.redirect("/groups");
  },
  index: async (req, res) => {
    console.log("GET /groups");
    let userId = "error";
    let userName = "error";
    let groups = "error";
    if (typeof req.session.passport === "undefined") {
      res.redirect("/login");
    } else {
      userId = req.session.passport.user.id;
      groups = await groupDatabase.select();
      console.log(`groupController userId: ${userId}`);
      const user = await employeeDb.selectIdAndName(userId);
      userName = user[0].name;
    }

    res.render("groups", { groups, userName });
  },
  indexAdd: async (req, res) => {
    const memberList = await employeeDb.select();
    const groupList = await groupDatabase.select();
    res.render("group-add", { memberList, groupList });
  },
};

module.exports = groupController;
