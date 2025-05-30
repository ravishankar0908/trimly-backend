import express from "express";
import { configDotenv } from "dotenv";
import userRouter from "./routers/userRouter.js";
import mongoose from "mongoose";
const app = express();
configDotenv();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/users", userRouter);

app.listen(PORT, async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/trimly");
    console.log(
      `the server is running on the port ${PORT} and Database connection is established.`
    );
  } catch (error) {
    console.error(`connection is not established ${error}`);
  }
});
