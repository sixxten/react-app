import { $host, $authHost } from "../http/index";

export type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  categoryId: number;
  Category?: { id: number; name: string };
  createdAt?: string;
  updatedAt?: string;
};

export type CreateProductDto = {
  title: string;
  description?: string;
  price: number;
  categoryId: number;
};

class ProductService {
  async getAll(): Promise<Product[]> {
    const { data } = await $host.get<Product[]>("/products");
    return data;
  }

  async create(payload: CreateProductDto): Promise<Product> {
    const { data } = await $authHost.post<Product>("/products", payload);
    return data;
  }
}

export const productService = new ProductService();