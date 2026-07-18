import { $authHost } from "../http/index";
import type { Product } from "./productService";

export type BasketItemResponse = {
  id: number;
  userId: number;
  productId: number;
  Product?: Product; 
  product?: Product;
};

export class BasketService {
  async getBasket(): Promise<BasketItemResponse[]> {
    const { data } = await $authHost.get<BasketItemResponse[]>("/basket");
    return data;
  }

  async add(productId: number): Promise<BasketItemResponse> {
    const { data } = await $authHost.post<BasketItemResponse>("/basket/add", { productId });
    return data;
  }

  async remove(productId: number) {
    const { data } = await $authHost.delete("/basket/remove/" + productId);
    return data;
  }

  async clear() {
    const { data } = await $authHost.delete("/basket/clear");
    return data;
  }
}

export const basketService = new BasketService();
