import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, User } from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { username, email, password: hashedPassword };
  await UserModel.create(newUser);
  res.status(201).json({ message: "User created successfully" });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await UserModel.findByEmail(email);
  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
  res.json({ token });
};
