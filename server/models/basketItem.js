const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const BasketItem = sequelize.define("basket_item", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = BasketItem;