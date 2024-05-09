const dbConfig = require("./config/dbCondig");
const GroupParticipant = require("./entity/GroupParticipant");

const groupParticipantDatabase = {
  addGroupParticipant: async (employeeId, groupId) => {
    const t = await dbConfig.transaction();
    try {
      const addGroupParticipant = await GroupParticipant.create(
        {
          employeeId,
          groupId,
        },
        { transaction: t }
      );
      t.commit();
      return addGroupParticipant;
    } catch (error) {
      const entireGroupParticipant = await GroupParticipant.findAll({
        raw: true,
      });
      t.rollback();
      return entireGroupParticipant;
    }
  },
  selectGroupParticipant: async () => {
    const entireGroupParticipant = await GroupParticipant.findAll({
      raw: true,
    });
    return entireGroupParticipant;
  },
};

module.exports = groupParticipantDatabase;
