const employeeIdDatabase = require("../../db/employeeIdDatabase");

const employeeIdController = {
  index: async (req, res) => {
    if (typeof req.session.passport === "undefined") {
      return res.redirect("/login");
    }
    const employeeIds = await employeeIdDatabase.selectEntireId();
    return res.render("employee-id-add", { employeeIds });
  },
  addEmployeeId: async (req, res) => {
    if (typeof req.session.passport === "undefined") {
      res.redirect("/login");
    }
    const { employeeId } = req.body;
    const result = await employeeIdDatabase.addEmployeeId(employeeId);
    if (result === "error") {
      res.redirect("/employee-ids");
    }
    res.redirect("/groups");
  },
};

module.exports = employeeIdController;
