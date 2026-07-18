const User = require("./user");
const Category = require("./category");
const Product = require("./product");

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = {
  User,
  Category,
  Product,
};