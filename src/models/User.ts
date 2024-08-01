import { RowDataPacket } from "mysql2/promise";
import pool from "../utils/db";
import bcrypt from "bcrypt";

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export class UserModel {
  static async getById(id: number): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, username, email FROM users WHERE id = ?",
      [id]
    );
    if (rows.length > 0) {
      return rows[0] as User;
    }
    return null;
  }

  static async getByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (rows.length > 0) {
      return rows[0] as User;
    }
    return null;
  }

  static async create(user: User): Promise<void> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [user.username, user.email, hashedPassword]
    );
  }

  static async updateProfile(id: number, user: Partial<User>): Promise<void> {
    const { username, email } = user;
    await pool.query("UPDATE users SET username = ?, email = ? WHERE id = ?", [
      username,
      email,
      id,
    ]);
  }

  static async updatePassword(id: number, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      id,
    ]);
  }
}
