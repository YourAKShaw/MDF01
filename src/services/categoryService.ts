import { CategoryModel, Category } from "../models/Category";

export class CategoryService {
  static async getAllCategories(): Promise<Category[]> {
    return await CategoryModel.getAll();
  }

  static async getCategoryById(id: number): Promise<Category | null> {
    return await CategoryModel.getById(id);
  }

  static async createCategory(category: Category): Promise<void> {
    await CategoryModel.create(category);
  }

  static async updateCategory(id: number, category: Category): Promise<void> {
    await CategoryModel.update(id, category);
  }

  static async deleteCategory(id: number): Promise<void> {
    await CategoryModel.delete(id);
  }
}
