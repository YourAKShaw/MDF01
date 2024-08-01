import { RowDataPacket } from "mysql2/promise";
import pool from "../utils/db";

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export class ProductModel {
  static async getAll(): Promise<Product[]> {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows as Product[];
  }

  static async getById(id: number): Promise<Product | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    if (rows.length > 0) {
      return rows[0] as Product;
    }
    return null;
  }

  static async create(product: Product): Promise<void> {
    await pool.query(
      "INSERT INTO products (name, description, price, categoryId) VALUES (?, ?, ?, ?)",
      [product.name, product.description, product.price, product.categoryId]
    );
  }

  static async update(id: number, product: Product): Promise<void> {
    await pool.query(
      "UPDATE products SET name = ?, description = ?, price = ?, categoryId = ? WHERE id = ?",
      [product.name, product.description, product.price, product.categoryId, id]
    );
  }

  static async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM products WHERE id = ?", [id]);
  }
}
