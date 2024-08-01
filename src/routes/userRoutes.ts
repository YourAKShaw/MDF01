import { Router } from "express";
import {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, getUserProfile);
router.put("/profile", authenticate, updateUserProfile);
router.put("/profile/password", authenticate, updateUserPassword);

export default router;
