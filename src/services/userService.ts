import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, User } from "../models/User";

export class UserService {
  static async register(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = { username, email, password: hashedPassword };
    await UserModel.create(newUser);
  }

  static async login(email: string, password: string): Promise<string | null> {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }
}
