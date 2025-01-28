import expressAsyncHandler from "express-async-handler";
import { sendError } from "../utils/response.util.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyToken = expressAsyncHandler(async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return sendError(res, 401, "Unauthorized, token not found.");
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return sendError(res, 401, "Unauthorized, user not found.");
    }

    req.user = user;

    next();
  } catch (error) {
    return sendError(res, 401, "Unauthorized, token is invalid.");
  }
});

export default verifyToken;
