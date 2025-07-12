import mongoose from "mongoose";
import { userModelMessages } from "../util/responseStatuscodes.js";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, userModelMessages.requireFirstName],
    },
    lastName: {
      type: String,
      required: [true, userModelMessages.requireLastName],
    },
    gender: {
      type: String,
      required: [true, userModelMessages.requireGender],
    },
    city: {
      type: String,
      required: [true, userModelMessages.requireCity],
    },
    emailAddress: {
      type: String,
      required: [true, userModelMessages.requireEmail],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, userModelMessages.requirePhone],
    },
    password: {
      type: String,
      required: [true, userModelMessages.requirePassword],
    },
    confirmPassword: {
      type: String,
      required: [true, userModelMessages.requireConfirmPassword],
    },
    role: {
      type: String,
      required: [true, userModelMessages.requireRole],
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
