const dbConfig = require("./config/dbCondig");
const Employee = require("./entity/Employee");
const GroupMessage = require("./entity/GroupMessage");

const groupMessageDatabase = {
  addGroupMessage: async (content, senderId, groupId) => {
    const t = await dbConfig.transaction();
    try {
      const addGroupMessage = await GroupMessage.create(
        {
          content,
          senderId,
          groupId,
        },
        { transaction: t }
      );
      await t.commit();
      return addGroupMessage;
    } catch (error) {
      const entireMessage = await GroupMessage.findAll({ raw: true });
      t.rollback();
      return entireMessage;
    }
  },
  selectGroupMessage: async () => {
    const entireMessage = await GroupMessage.findAll({ raw: true });
    return entireMessage;
  },
  selectGroupMessageById: async (groupId) => {
    const entireMessage = await GroupMessage.findAll({
      include: Employee,
      raw: true,
      where: {
        groupId,
      },
    });
    return entireMessage;
  },
};

module.exports = groupMessageDatabase;
