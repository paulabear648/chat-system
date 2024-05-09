const employeeDb = require("../../db/employeeDatabase");
const positionDb = require("../../db/positionDatabase");

const positionController = {
  index: async (req, res) => {
    if (typeof req.session.passport === "undefined") {
      res.redirect("/login");
    }
    const employees = await employeeDb.selectIncludePosition();
    const positions = await positionDb.selectPosition();

    console.log(`employees: ${JSON.stringify(employees[0])}`);

    res.render("positions", { employees, positions });
  },
  updatePosition: (req, res) => {
    if (typeof req.session.passport === "undefined") {
      res.redirect("/login");
    }
    /*
    const { employeeId } = req.body;
    const result = await employeeIdDatabase.addEmployeeId(employeeId);
    if (result === "error") {
      res.redirect("/employee-ids");
    }
    */
    const { listvalue, rr123456PositionId } = req.body;
    console.log(`listvalue: ${listvalue}`);
    console.log(`rr123456PositionId: ${rr123456PositionId}`);

    res.redirect("/groups");
  },
};

module.exports = positionController;
