import mongoose from "mongoose";
import { adminModelMessage } from "../util/responseStatuscodes.js";
const adminSchema = mongoose.Schema(
  {
    emailAddress: {
      type: String,
      required: [true, adminModelMessage.requireEmail],
    },
    password: {
      type: String,
      required: [true, adminModelMessage.requirePassword],
    },
    role: {
      type: String,
      default: "admin",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const adminModel = mongoose.model("adminDetailsCollection", adminSchema);
export default adminModel;
