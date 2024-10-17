import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

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

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRoutes);