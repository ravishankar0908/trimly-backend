import mongoose from "mongoose";
import { userModelMessages } from "../util/responseStatuscodes.js";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, userModelMessages.requireFirstName],
    },
    lastName: {
      type: String,
      require: [true, userModelMessages.requireLastName],
    },
    gender: {
      type: String,
      require: [true, userModelMessages.requireGender],
    },
    city: {
      type: String,
      require: [true, userModelMessages.requireCity],
    },
    emailAddress: {
      type: String,
      require: [true, userModelMessages.requireEmail],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      require: [true, userModelMessages.requirePhone],
    },
    password: {
      type: String,
      require: [true, userModelMessages.requirePassword],
    },
    confirmPassword: {
      type: String,
      require: [true, userModelMessages.requireConfirmPassword],
    },
    role: {
      type: String,
      default: "user",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("userDetailsCollection", userSchema);

export default userModel;
