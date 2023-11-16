const { Sequelize } = require("sequelize");

const db = new Sequelize("db-temantb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
