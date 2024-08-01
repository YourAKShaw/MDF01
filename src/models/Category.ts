import { RowDataPacket } from "mysql2/promise";
import pool from "../utils/db";

export interface Category {
  id?: number;
  name: string;
  description: string;
}

export class CategoryModel {
  static async getAll(): Promise<Category[]> {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows as Category[];
  }

  static async getById(id: number): Promise<Category | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );
    if (rows.length > 0) {
      return rows[0] as Category;
    }
    return null;
  }

  static async create(category: Category): Promise<void> {
    await pool.query(
      "INSERT INTO categories (name, description) VALUES (?, ?)",
      [category.name, category.description]
    );
  }

  static async update(id: number, category: Category): Promise<void> {
    await pool.query(
      "UPDATE categories SET name = ?, description = ? WHERE id = ?",
      [category.name, category.description, id]
    );
  }

  static async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM categories WHERE id = ?", [id]);
  }
}
