const Group = require("./entity/Group");

const groupDatabase = {
  insert: async (name, type) => {
    if (type === "private" || type === "group" || type === "all") {
      await Group.create({
        name,
        type,
      });
    }
    const insertGroup = await Group.findAll({ raw: true });
    return insertGroup;
  },
  select: async () => {
    const selectTask = await Group.findAll({ raw: true });
    return selectTask;
  },
  selectGroupName: async (groupId) => {
    const groupName = await Group.findAll({
      attributes: ["name"],
      raw: true,
      where: { id: groupId },
    });
    return groupName;
  },
  selectGroupType: async (groupId) => {
    const groupType = await Group.findAll({
      attributes: ["type"],
      raw: true,
      where: { id: groupId },
    });
    return groupType;
  },
  sync: async () => {
    await Group.sync();
  },
  syncForce: async () => {
    await Group.sync({ force: true });
  },
};
module.exports = groupDatabase;
