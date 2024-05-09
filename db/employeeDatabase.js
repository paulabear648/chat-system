const Employee = require("./entity/Employee");
const EmployeeId = require("./entity/EmployeeId");
const Position = require("./entity/Position");

const employeeDatabase = {
  addEmployee: async (id, name, password, positionId) => {
    // EmployeeIdテーブルの中からidを探してくる
    const employeeId = await EmployeeId.findByPk(id);
    // idが存在していた場合、社員データベースに追加
    if (employeeId !== null) {
      const addEmployee = await Employee.create({
        id,
        name,
        password,
        positionId,
      });
      return addEmployee;
    }
    // そうでなかった場合、"error"を返す
    return "error";
  },
  isInfoRegistered: async (employeeId) => {
    const selectEmp = await Employee.findOne({
      where: {
        employeeId,
      },
    });
    if (selectEmp === null) {
      return false;
    }
    return selectEmp.isRegistered;
  },
  select: async () => {
    const selectEmployee = await Employee.findAll({ raw: true });
    return selectEmployee;
  },
  selectIncludePosition: async () => {
    const selectEmployee = await Employee.findAll({
      raw: true,
      include: Position,
    });
    return selectEmployee;
  },
  selectNameById: async (userId) => {
    const name = await Employee.findOne({
      attributes: ["name"],
      raw: true,
      where: { id: userId },
    });
    return name;
  },
  selectIdAndName: async (userId) => {
    const selectIdAndName = await Employee.findAll({
      attributes: ["id", "name"],
      raw: true,
      where: {
        id: userId,
      },
    });
    return selectIdAndName;
  },
  sync: async () => {
    await Employee.sync();
  },
  syncForce: async () => {
    await Employee.sync({ force: true });
  },
};

module.exports = employeeDatabase;
