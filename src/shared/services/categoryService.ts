import { $host } from "../http/index";

export type Category = {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

class CategoryService {
  async getAll(): Promise<Category[]> {
    const { data } = await $host.get<Category[]>("/categories");
    return data;
  }
}

export const categoryService = new CategoryService();