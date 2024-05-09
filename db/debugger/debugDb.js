const employeeDatabase = require("../employeeDatabase");
const AllMessage = require("../entity/AllMessage");
const Employee = require("../entity/Employee");
const EmployeeId = require("../entity/EmployeeId");
const Position = require("../entity/Position");

(async () => {
  await Position.create({ id: 0, name: "manager" });
  await Position.create({ id: 1, name: "Leader" });
  await Position.create({ id: 2, name: "regular" });
  await EmployeeId.create({ id: "rr123456" });
  console.log(await EmployeeId.findAll({ raw: true }));
  console.log(await EmployeeId.findByPk("rr123454", { raw: true }));
  await employeeDatabase.addEmployee("rr123456", "taro", "debugger", 0);
  await employeeDatabase.addEmployee("rr123454", "fumito", "hello", 0);
  await AllMessage.create({ content: "sample", senderId: "rr123456" });
  console.log(await AllMessage.findAll({ raw: true }));
  console.log(await Employee.findAll({ raw: true }));
})();
