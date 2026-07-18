const productService = require("../services/productService");

class ProductController {
  async create(req, res) {
    try {
      const product = await productService.create(req.body);
      return res.status(201).json(product);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async getAll(req, res) {
    try {
      const products = await productService.getAll();
      return res.json(products);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async getById(req, res) {
    try {
      const product = await productService.getById(req.params.id);
      return res.json(product);
    } catch (e) {
      return res.status(404).json({ message: e.message });
    }
  }

  async update(req, res) {
    try {
      const product = await productService.update(req.params.id, req.body);
      return res.json(product);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async remove(req, res) {
    try {
      const result = await productService.remove(req.params.id);
      return res.json(result);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
}

module.exports = new ProductController();