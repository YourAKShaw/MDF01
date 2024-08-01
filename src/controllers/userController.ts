import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { User } from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const newUser: User = { username, email, password };
    await UserService.register(newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await UserService.login(email, password);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Here you would typically generate and return a JWT token
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId || 0; // Assuming userId is set in the request object after JWT verification

  try {
    const user = await UserService.getUserProfile(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId || 0; // Assuming userId is set in the request object after JWT verification
  const { username, email } = req.body;

  try {
    await UserService.updateUserProfile(userId, { username, email });
    res.json({ message: "User profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId || 0; // Assuming userId is set in the request object after JWT verification
  const { password } = req.body;

  try {
    await UserService.updateUserPassword(userId, password);
    res.json({ message: "User password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
