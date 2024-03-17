const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("perndbcms", "postgres", "password", {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "password",
  database: "perndbcms",
  logging: console.log,
});

module.exports = { sequelize };
