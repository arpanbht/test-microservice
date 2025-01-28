import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(verifyToken, getUserProfile);
router.route("/").get(verifyToken, getAllUsers);

export default router;
