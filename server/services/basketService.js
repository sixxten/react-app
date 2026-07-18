const { BasketItem, Product } = require("../models");

class BasketService {
  async getBasket(userId) {
    const items = await BasketItem.findAll({
      where: { userId },
      include: [{ model: Product }]
    });
    return items;
  }

  async add(userId, productId) {
    const existingItem = await BasketItem.findOne({
      where: { userId, productId }
    });

    if (existingItem) {
      return existingItem;
    }

    const basketItem = await BasketItem.create({ userId, productId });
    return await BasketItem.findByPk(basketItem.id, {
      include: [{ model: Product }]
    });
  }

  async remove(userId, productId) {
    const item = await BasketItem.findOne({ where: { userId, productId } });
    if (!item) throw new Error("Item not found in basket");
    
    await item.destroy();
    return { message: "Item removed from basket" };
  }

  async clear(userId) {
    await BasketItem.destroy({ where: { userId } });
    return { message: "Basket cleared" };
  }
}

module.exports = new BasketService();