// userService.test.ts

import { UserService } from "./userService";
import { UserModel, User } from "../models/User";
import bcrypt from "bcrypt";

jest.mock("../models/User");
jest.mock("bcrypt");

describe("UserService", () => {
  const mockUser: User = {
    id: 1,
    username: "Test User",
    email: "test@example.com",
    password: "hashedpassword",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should create a new user", async () => {
      (UserModel.create as jest.Mock).mockResolvedValue(undefined);

      await UserService.register(mockUser);

      expect(UserModel.create).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("login", () => {
    it("should return the user if email and password match", async () => {
      (UserModel.getByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await UserService.login(mockUser.email, "password");

      expect(UserModel.getByEmail).toHaveBeenCalledWith(mockUser.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password",
        mockUser.password
      );
      expect(result).toEqual(mockUser);
    });

    it("should return null if email does not exist", async () => {
      (UserModel.getByEmail as jest.Mock).mockResolvedValue(null);

      const result = await UserService.login(
        "nonexistent@example.com",
        "password"
      );

      expect(UserModel.getByEmail).toHaveBeenCalledWith(
        "nonexistent@example.com"
      );
      expect(result).toBeNull();
    });

    it("should return null if password does not match", async () => {
      (UserModel.getByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await UserService.login(mockUser.email, "wrongpassword");

      expect(UserModel.getByEmail).toHaveBeenCalledWith(mockUser.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "wrongpassword",
        mockUser.password
      );
      expect(result).toBeNull();
    });
  });

  describe("getUserProfile", () => {
    it("should return the user profile by id", async () => {
      (UserModel.getById as jest.Mock).mockResolvedValue(mockUser);

      const result = await UserService.getUserProfile(mockUser.id || 0);

      expect(UserModel.getById).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual(mockUser);
    });

    it("should return null if user does not exist", async () => {
      (UserModel.getById as jest.Mock).mockResolvedValue(null);

      const result = await UserService.getUserProfile(999);

      expect(UserModel.getById).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  });

  describe("updateUserProfile", () => {
    it("should update the user profile", async () => {
      (UserModel.updateProfile as jest.Mock).mockResolvedValue(undefined);
      const updatedUser: Partial<User> = { username: "Updated User" };

      await UserService.updateUserProfile(mockUser.id || 0, updatedUser);

      expect(UserModel.updateProfile).toHaveBeenCalledWith(
        mockUser.id,
        updatedUser
      );
    });
  });

  describe("updateUserPassword", () => {
    it("should update the user password", async () => {
      (UserModel.updatePassword as jest.Mock).mockResolvedValue(undefined);

      await UserService.updateUserPassword(mockUser.id || 0, "newpassword");

      expect(UserModel.updatePassword).toHaveBeenCalledWith(
        mockUser.id,
        "newpassword"
      );
    });
  });
});
