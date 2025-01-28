import express from "express";
import cors from "cors";
import helthCheckRouter from "./routes/healthcheck.route.js";
import adminRouter from "./routes/admin.route.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check route
app.use("/health", helthCheckRouter);

// admin routes
app.use("/admin", adminRouter);

export default app;
