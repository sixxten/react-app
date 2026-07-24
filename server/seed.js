const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Category = require("./models/Category");
const Product = require("./models/Product");

async function seedDatabase() {
  try {
    const adminExists = await User.findOne({ where: { email: "123@gmail.com" } });
    if (!adminExists) {
      const hashPassword = await bcrypt.hash("123123", 5); 
      
      await User.create({
        email: "123@gmail.com",
        password: hashPassword,
        role: "admin",
      });
      console.log("Админ создан!");
    }

    const categoryCount = await Category.count();
    if (categoryCount === 0) {
      await Category.bulkCreate([
        { name: "Товары для дома" },
        { name: "Красота и уход" },
        { name: "Спорт и отдых" },
      ]);
      console.log("Категории созданы!");
    }
  } catch (e) {
    console.error("Ошибка при наполнении базы данных:", e);
  }
}

module.exports = seedDatabase;
