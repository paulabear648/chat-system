const { DataTypes } = require("sequelize");

const dbConfig = require("../config/dbCondig");

const GroupParticipant = dbConfig.define(
  "GroupParticipant",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false }
);

module.exports = GroupParticipant;
