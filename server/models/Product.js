const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(160),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

module.exports = Product;