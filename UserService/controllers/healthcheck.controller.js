import expressAsyncHandler from "express-async-handler";
import { sendSuccess } from "../utils/response.util.js";

export const healthCheckController = expressAsyncHandler(async (req, res) => {
  return sendSuccess(
    res,
    200,
    { uptime: process.uptime() },
    "Admin service is up and running."
  );
});