import express from "express";
import { configDotenv } from "dotenv";
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import shopownerRouter from "./routers/shopownerRouter.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { defaultAdmin } from "./util/defaultAdmin.js";
const app = express();
configDotenv();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    Credential: true,
  })
);

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/shopowners", shopownerRouter);

app.listen(PORT, async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/trimly");
    console.log(
      `the server is running on the port ${PORT} and Database connection is established.`
    );
    await defaultAdmin();
  } catch (error) {
    console.error(`connection is not established ${error}`);
  }
});
