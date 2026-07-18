const User = require("./user");
const Category = require("./category");
const Product = require("./product");
const BasketItem = require("./basketItem");

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

User.hasMany(BasketItem, { foreignKey: "userId" });
BasketItem.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(BasketItem, { foreignKey: "productId" });
BasketItem.belongsTo(Product, { foreignKey: "productId" });

module.exports = {
  User,
  Category,
  Product,
  BasketItem,
};
