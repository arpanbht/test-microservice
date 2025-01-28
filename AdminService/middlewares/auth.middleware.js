import expressAsyncHandler from "express-async-handler";
import { sendError } from "../utils/response.util.js";
import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";

const verifyToken = expressAsyncHandler(async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return sendError(res, 401, "Unauthorized, token not found.");
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded._id).select("-password");

    if (!admin) {
      return sendError(res, 401, "Unauthorized, admin not found.");
    }

    req.admin = admin;

    next();
  } catch (error) {
    return sendError(res, 401, "Unauthorized, token is invalid.");
  }
});

export default verifyToken;
