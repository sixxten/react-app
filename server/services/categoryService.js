const { Category } = require("../models");

class CategoryService {
  async getAll() {
    return Category.findAll({ order: [["name", "ASC"]] });
  }
}

module.exports = new CategoryService();