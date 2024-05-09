const dbConfig = require("./config/dbCondig");
const EmployeeId = require("./entity/EmployeeId");

const employeeIdDatabase = {
  addEmployeeId: async (id) => {
    const t = await dbConfig.transaction();
    try {
      const addEmployeeId = await EmployeeId.create({ id }, { transaction: t });
      await t.commit();
      return addEmployeeId;
    } catch (error) {
      await t.rollback();
      return "error";
    }
  },
  selectEntireId: async () => {
    const entireEmployeeId = await EmployeeId.findAll({ raw: true });
    return entireEmployeeId;
  },
  sync: async () => {
    await EmployeeId.sync();
  },
  syncForce: async () => {
    await EmployeeId.sync({ force: true });
  },
};

module.exports = employeeIdDatabase;
