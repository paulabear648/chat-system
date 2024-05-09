const { DataTypes } = require("sequelize");
const useBcrypt = require("sequelize-bcrypt");

const dbConfig = require("../config/dbCondig");
const AllMessage = require("./AllMessage");
const GroupMessage = require("./GroupMessage");
const GroupParticipant = require("./GroupParticipant");
const Position = require("./Position");

const Employee = dbConfig.define(
  "Employee",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

const options = {
  field: "password",
  rounds: 12,
  compare: "authenticate",
};

useBcrypt(Employee, options);

Employee.hasOne(GroupParticipant, {
  sourceKey: "id",
  foreignKey: "employeeId",
});
GroupParticipant.belongsTo(Employee, {
  targetKey: "id",
  foreignKey: "employeeId",
});

Employee.hasMany(GroupMessage, {
  sourceKey: "id",
  foreignKey: { name: "senderId", allowNull: false },
});
GroupMessage.belongsTo(Employee, {
  targetKey: "id",
  foreignKey: { name: "senderId", allowNull: false },
});

Employee.hasMany(AllMessage, {
  sourceKey: "id",
  foreignKey: "senderId",
});
AllMessage.belongsTo(Employee, {
  targetKey: "id",
  foreignKey: "senderId",
});

Position.hasMany(Employee, {
  sourceKey: "id",
  foreignKey: "positionId",
});
Employee.belongsTo(Position, {
  targetKey: "id",
  foreignKey: "positionId",
});
module.exports = Employee;
