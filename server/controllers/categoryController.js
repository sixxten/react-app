const categoryService = require("../services/categoryService");

class CategoryController {
  async getAll(req, res) {
    try {
      const categories = await categoryService.getAll();
      return res.json(categories);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
}

module.exports = new CategoryController();
