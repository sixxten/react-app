import { makeAutoObservable } from "mobx";
import { type Product } from "../shared/services/productService";

class CartStore {
  items: Product[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem(product: Product) {
    const exists = this.items.find((item) => item.id === product.id);
    if (!exists) {
      this.items.push(product);
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  clearCart() {
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