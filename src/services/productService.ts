import { ProductModel, Product } from "../models/Product";

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    return await ProductModel.getAll();
  }

  static async getProductById(id: number): Promise<Product | null> {
    return await ProductModel.getById(id);
  }

  static async createProduct(product: Product): Promise<void> {
    await ProductModel.create(product);
  }

  static async updateProduct(id: number, product: Product): Promise<void> {
    await ProductModel.update(id, product);
  }

  static async deleteProduct(id: number): Promise<void> {
    await ProductModel.delete(id);
  }
}
