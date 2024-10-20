import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 4000;

mongoose
  .connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
  .then(() => console.log("Mongo db connected successfully"))
  .catch((err) => console.error("Error connecting database", err));

app.listen(port, () => {
  console.log("Server listening on port " + port);
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const messege = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    messege,
  });
});
