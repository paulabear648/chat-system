const { DataTypes } = require("sequelize");

const dbConfig = require("../config/dbCondig");

const GroupMessage = dbConfig.define(
  "GroupMessage",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    createdAt: "time",
  }
);

module.exports = GroupMessage;
