import { Request, Response } from "express";
import { UserService } from "../services/userService";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    await UserService.register(username, email, password);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const token = await UserService.login(email, password);
    if (!token) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
