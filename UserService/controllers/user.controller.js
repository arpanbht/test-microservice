import expressAsyncHandler from "express-async-handler";
import {
  sendSuccess,
  sendError,
  sendServerError,
} from "../utils/response.util.js";
import User from "../models/user.model.js";

export const registerUser = expressAsyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 400, "Please provide all fields.");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendError(res, 400, "User already exists.");
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    console.log(user);

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return sendError(res, 400, "User registration failed.");
    }

    return sendSuccess(res, 201, createdUser, "User registered successfully.");
  } catch (error) {
    return sendServerError(res, error);
  }
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, "Please provide email and password.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return sendError(res, 400, "User is not registered.");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return sendError(res, 400, "Invalid password.");
    }

    const token = await user.generateAuthToken();

    res.set("Authorization", `Bearer ${token}`);

    return sendSuccess(res, 200, "User logged in successfully.", token);
  } catch (error) {
    return sendServerError(res, error);
  }
});

export const getUserProfile = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return sendError(res, 400, "User not found.");
    }

    return sendSuccess(res, 200, user, "User profile fetched successfully.");
  } catch (error) {
    return sendServerError(res, error);
  }
});

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
      return sendError(res, 400, "No users found.");
    }

    return sendSuccess(res, 200, admins, "Users fetched successfully.");
  } catch (error) {
    return sendServerError(res, error);
  }
});
