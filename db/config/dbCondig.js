const { Sequelize } = require("sequelize");

const dbConfig = new Sequelize({
  dialect: "sqlite",
  logging: false,
  storage: "./db/source/database.sqlite",
});

module.exports = dbConfig;
