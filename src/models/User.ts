import { RowDataPacket } from "mysql2/promise";
import pool from "../utils/db";

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export class UserModel {
  static async create(user: User): Promise<any> {
    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [user.username, user.email, user.password]
    );
    return result;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows.length > 0 ? (rows[0] as User) : null;
  }
}
