import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getAllAdmins,
} from "../controllers/admin.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/profile").get(verifyToken, getAdminProfile);
router.route("/").get(verifyToken, getAllAdmins);

export default router;
