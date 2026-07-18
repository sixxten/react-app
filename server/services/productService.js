const { Product, Category } = require("../models");

class ProductService {
  async create({ title, description, price, categoryId }) {
    if (!title || price == null || !categoryId) {
      throw new Error("title, price, categoryId are required");
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }

    const product = await Product.create({
      title,
      description: description ?? "",
      price,
      categoryId,
    });

    return Product.findByPk(product.id, { include: [{ model: Category }] });
  }

  async getAll() {
    return Product.findAll({
      include: [{ model: Category }],
      order: [["createdAt", "DESC"]],
    });
  }

  async getById(id) {
    const product = await Product.findByPk(id, {
      include: [{ model: Category }],
    });

    if (!product) throw new Error("Product not found");
    return product;
  }

  async update(id, payload) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    if (payload.categoryId) {
      const category = await Category.findByPk(payload.categoryId);
      if (!category) throw new Error("Category not found");
    }

    await product.update({
      title: payload.title ?? product.title,
      description: payload.description ?? product.description,
      price: payload.price ?? product.price,
      categoryId: payload.categoryId ?? product.categoryId,
    });

    return Product.findByPk(id, { include: [{ model: Category }] });
  }

  async remove(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    await product.destroy();
    return { message: "Deleted" };
  }
}

module.exports = new ProductService();