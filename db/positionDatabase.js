const dbConfig = require("./config/dbCondig");
const Position = require("./entity/Position");

const positionDatabase = {
  addPosition: async (id, name) => {
    const t = await dbConfig.transaction();
    try {
      const addPosition = await Position.create(
        { id, name },
        { transaction: t }
      );
      await t.commit();
      return addPosition;
    } catch (error) {
      const entirePosition = await Position.findAll({ raw: true });
      await t.rollback();
      return entirePosition;
    }
  },
  selectPosition: async () => {
    const entirePosition = await Position.findAll({ raw: true });
    return entirePosition;
  },
  sync: async () => {
    await Position.sync();
  },
  syncForce: async () => {
    await Position.sync({ force: true });
  },
};

module.exports = positionDatabase;
