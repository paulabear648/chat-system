const AllMessage = require("../entity/AllMessage");
const Employee = require("../entity/Employee");
const EmployeeId = require("../entity/EmployeeId");
const Group = require("../entity/Group");
const GroupMessage = require("../entity/GroupMessage");
const GroupParticipant = require("../entity/GroupParticipant");
const Position = require("../entity/Position");

const initAllDb = async () => {
  await EmployeeId.sync({ force: true });
  await Position.sync({ force: true });
  await Employee.sync({ force: true });
  await Group.sync({ force: true });
  await AllMessage.sync({ force: true });
  await GroupMessage.sync({ force: true });
  await GroupParticipant.sync({ force: true });
};

(async () => {
  await initAllDb();
})();

module.exports = initAllDb;
