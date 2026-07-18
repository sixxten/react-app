import { makeAutoObservable } from "mobx";
import type { Product } from "../shared/services/productService";
import { basketService, type BasketItemResponse } from "../shared/services/basketService";

class CartStore {
  items: Product[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBasket() {
    try {
      const basketItems = await basketService.getBasket();
      
      // Заменили any на BasketItemResponse
      this.items = basketItems
        .map((item: BasketItemResponse) => item.product || item.Product)
        .filter((item): item is Product => item !== undefined);
        
    } catch (error) {
      console.error("Ошибка загрузки корзины:", error);
    }
  }

  async addItem(product: Product) {
    try {
      await basketService.add(product.id);
      if (!this.items.find(item => item.id === product.id)) {
        this.items.push(product);
      }
    } catch (error) {
      console.error("Ошибка добавления в корзину:", error);
    }
  }

  async removeItem(productId: number) {
    try {
      await basketService.remove(productId);
      this.items = this.items.filter((item) => item.id !== productId);
    } catch (error) {
      console.error("Ошибка удаления из корзины:", error);
    }
  }

  async clearCart() {
    try {
      await basketService.clear();
      this.items = [];
    } catch (error) {
      console.error("Ошибка очистки корзины:", error);
    }
  }

  resetLocalCart() {
    this.items = [];
  }

  get totalCount() {
    return this.items.length;
  }

  get totalPrice() {
    return this.items.reduce((sum, item) => sum + Number(item.price), 0);
  }
}

export const cartStore = new CartStore();
