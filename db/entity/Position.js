const { DataTypes } = require("sequelize");

const dbConfig = require("../config/dbCondig");

const Position = dbConfig.define(
  "Position",
  {
    id: {
      primaryKey: true,
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

module.exports = Position;
