import express from "express";
import cors from "cors";
import helthCheckRouter from "./routes/healthcheck.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check route
app.use("/health", helthCheckRouter);

// user routes
app.use("/user", userRouter);

export default app;
