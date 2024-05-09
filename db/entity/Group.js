const { DataTypes } = require("sequelize");

const dbConfig = require("../config/dbCondig");
const GroupMessage = require("./GroupMessage");
const GroupParticipant = require("./GroupParticipant");

const Group = dbConfig.define(
  "Group",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Group.hasMany(GroupParticipant, {
  sourceKey: "id",
  foreignKey: "groupId",
});
GroupParticipant.belongsTo(Group, {
  targetKey: "id",
  foreignKey: "groupId",
});

Group.hasMany(GroupMessage, {
  sourceKey: "id",
  foreignKey: { name: "groupId", allowNull: false },
});
GroupMessage.belongsTo(Group, {
  targetKey: "id",
  foreignKey: { name: "groupId", allowNull: false },
});

module.exports = Group;
