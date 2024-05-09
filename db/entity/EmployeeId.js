const { DataTypes } = require("sequelize");

const dbConfig = require("../config/dbCondig");

const EmployeeId = dbConfig.define(
  "EmployeeId",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        is: ["^[a-z]{2}[0-9]{6}", "u"],
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = EmployeeId;
