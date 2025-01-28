import expressAsyncHandler from "express-async-handler";
import {
  sendSuccess,
  sendError,
  sendServerError,
} from "../utils/response.util.js";
import Admin from "../models/admin.model.js";

export const registerAdmin = expressAsyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 400, "Please provide all fields.");
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return sendError(res, 400, "Admin already exists.");
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });
    console.log(admin);

    const createdAdmin = await Admin.findById(admin._id).select("-password");

    if (!createdAdmin) {
      return sendError(res, 400, "Admin registration failed.");
    }

    return sendSuccess(
      res,
      201,
      createdAdmin,
      "Admin registered successfully."
    );
  } catch (error) {
    return sendServerError(res, error);
  }
});

export const loginAdmin = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, "Please provide email and password.");
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return sendError(res, 400, "Admin is not registered.");
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return sendError(res, 400, "Invalid password.");
    }

    const token = await admin.generateAuthToken();

    res.set("Authorization", `Bearer ${token}`);

    return sendSuccess(res, 200, "Admin logged in successfully.", token);
  } catch (error) {
    return sendServerError(res, error);
  }
});

export const getAdminProfile = expressAsyncHandler(async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");

    if (!admin) {
      return sendError(res, 400, "Admin not found.");
    }

    return sendSuccess(res, 200, admin, "Admin profile fetched successfully.");
  } catch (error) {
    return sendServerError(res, error);
  }
});

export const getAllAdmins = expressAsyncHandler(async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");

    if (!admins) {
      return sendError(res, 400, "No admins found.");
    }

    return sendSuccess(res, 200, admins, "Admins fetched successfully.");
  } catch (error) {
    return sendServerError(res, error);
  }
});
