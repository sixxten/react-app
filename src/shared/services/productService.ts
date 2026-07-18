import { $host, $authHost } from "../http/index";

export type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  categoryId: number;
  imageUrl?: string | null;
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
  async uploadImage(productId: number, file: File): Promise<Product> {
    const form = new FormData();
    form.append("image", file);

    const { data } = await $authHost.post<Product>(
        `/products/${productId}/image`,
        form
    );

    return data;
  }

}

export const productService = new ProductService();