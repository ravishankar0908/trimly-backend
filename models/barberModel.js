import mongoose from "mongoose";
import { barberModelMessage } from "../util/responseStatuscodes.js";

const barberSchema = mongoose.Schema(
  {
    shopName: {
      type: String,
      require: [true, barberModelMessage.requireshopname],
    },
    city: {
      type: String,
      require: [true, barberModelMessage.requireCity],
    },
    emailAddress: {
      type: String,
      require: [true, barberModelMessage.requireEmail],
    },
    phoneNumber: {
      type: Number,
      require: [true, barberModelMessage.requirePhone],
    },
    password: {
      type: String,
      require: [true, barberModelMessage.requirePassword],
    },
    confirmPassword: {
      type: String,
      require: [true, barberModelMessage.requireConfirmPassword],
    },
    role: {
      type: String,
      require: [true, barberModelMessage.requireRole],
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const barberModel = mongoose.model("barberDetailsCollection", barberSchema);

export default barberModel;
