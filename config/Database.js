const { Sequelize } = require("sequelize");

const db = new Sequelize("temanTB", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
