const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const { v4: uuidv4 } = require("uuid");

const UUID_PREFIX = "USER_";

const users = db.define(
  "users",
  {
    userID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

users.beforeCreate((user, options) => {
  user.userID = `${UUID_PREFIX}${uuidv4()}`;
});

module.exports = users;
