const employeeDatabase = require("../../db/employeeDatabase");
const groupDatabase = require("../../db/groupDatabase");
const groupParticipantDatabase = require("../../db/groupParticipantDatabase");
const createPrivateGroup = async () => {
  console.log("createPrivateGroup");
  // 追加した従業のidを取得するために実行
  const employees = await employeeDatabase.select();
  console.log("first");
  const newEmployee = employees[employees.length - 1];
  console.log("second");
  // 最新のグループのidを取得 より高速な方法があるかも
  const groups = await groupDatabase.select();
  console.log(`employees: ${JSON.stringify(employees)}`);
  console.log(`groups: ${groups}`);
  let lastGroupId = 0;
  if (groups.length !== 0) {
    lastGroupId = groups[groups.length - 1].id;
  }
  for (const employee of employees) {
    if (employees[employees.length - 1] === employee) {
      break;
    }
    if (employee.id !== newEmployee.id) {
      lastGroupId += 1;
      groupDatabase.insert(`${employee.name} - ${newEmployee.name}`, "private");
    }
  }

  if (employees[employees.length - 1].id !== newEmployee.id) {
    lastGroupId += 1;
    await groupDatabase.insert(
      `${employees[employees.length - 1].name} - ${newEmployee.name}`,
      "private"
    );
  }
  const groups2 = await groupDatabase.select();
  console.log(`groups2: ${groups2}`);
  if (groups.length !== 0) {
    lastGroupId = groups[groups.length - 1].id;
  }
  for (const employee of employees) {
    if (employee.id !== newEmployee.id) {
      lastGroupId += 1;
      groupParticipantDatabase.addGroupParticipant(employee.id, lastGroupId);
      groupParticipantDatabase.addGroupParticipant(newEmployee.id, lastGroupId);
    }
  }
};

const registerController = {
  index: (req, res) => {
    res.render("register");
  },
  registerEmployee: async (req, res) => {
    console.log("registerEmployee");
    const { id } = req.body;
    const { name } = req.body;
    const { password } = req.body;
    // デフォルトで役職は２番（一般社員）
    const result = await employeeDatabase.addEmployee(id, name, password, 2);
    if (result === "error") {
      res.redirect("/register");
      return;
    }
    createPrivateGroup();
    res.redirect("/login");
  },
};

module.exports = registerController;

/*
const employeeDatabase = require("../../db/employeeDatabase");

const registerController = {
  index: (req, res) => {
    res.render("register");
  },
  registerEmployee: async (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { password } = req.body;
    // デフォルトで役職は２番（一般社員）
    const result = await employeeDatabase.addEmployee(id, name, password, 2);
    if (result === "error") {
      return res.redirect("/register");
    }
    return res.redirect("/login");
  },
};

module.exports = registerController;
*/
