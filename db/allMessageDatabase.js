const AllMessage = require("./entity/AllMessage");
const dbConfig = require("./config/dbCondig");
const Employee = require("./entity/Employee");

const allMessageDatabase = {
  addMessage: async (content, senderId) => {
    const t = await dbConfig.transaction();
    try {
      const addMessage = await AllMessage.create(
        { content, senderId },
        { transaction: t }
      );
      await t.commit();
      return addMessage;
    } catch (error) {
      const entireMessage = await AllMessage.findAll({ raw: true });
      await t.rollback();
      return entireMessage;
    }
  },
  selectEntireMessage: async () => {
    const entireMessage = await AllMessage.findAll({
      include: Employee,
      raw: true,
    });
    return entireMessage;
  },
};

module.exports = allMessageDatabase;
