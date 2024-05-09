const { DataTypes } = require("sequelize");

const dbConfig = require("../config/dbCondig");

const AllMessage = dbConfig.define(
  "AllMessage",
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

module.exports = AllMessage;
