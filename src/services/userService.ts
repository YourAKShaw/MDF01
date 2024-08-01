import { UserModel, User } from "../models/User";
import bcrypt from "bcrypt";

export class UserService {
  static async register(user: User): Promise<void> {
    await UserModel.create(user);
  }

  static async login(email: string, password: string): Promise<User | null> {
    const user = await UserModel.getByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  static async getUserProfile(id: number): Promise<User | null> {
    return await UserModel.getById(id);
  }

  static async updateUserProfile(
    id: number,
    user: Partial<User>
  ): Promise<void> {
    await UserModel.updateProfile(id, user);
  }

  static async updateUserPassword(id: number, password: string): Promise<void> {
    await UserModel.updatePassword(id, password);
  }
}
