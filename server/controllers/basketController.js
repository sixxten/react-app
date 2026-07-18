const basketService = require("../services/basketService");

class BasketController {
  async getBasket(req, res) {
    try {
      const items = await basketService.getBasket(req.user.userId);
      return res.json(items);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async add(req, res) {
    try {
      const { productId } = req.body;
      const item = await basketService.add(req.user.userId, productId);
      return res.json(item);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async remove(req, res) {
    try {
      const result = await basketService.remove(req.user.userId, req.params.productId);
      return res.json(result);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async clear(req, res) {
    try {
      const result = await basketService.clear(req.user.userId);
      return res.json(result);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
}

module.exports = new BasketController();
