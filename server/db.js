const { Sequelize } = require("sequelize");
const config = require("config");
console.log("DB CONFIG:", {
  host: config.get("database.host"),
  port: config.get("database.port"),
  name: config.get("database.name"),
  user: config.get("database.user"),
});


module.exports = new Sequelize(
  config.get("database.name"),
  config.get("database.user"),
  config.get("database.password"),
  {
    host: config.get("database.host"),
    port: config.get("database.port"),
    dialect: "postgres",
    logging: false
  }
);


