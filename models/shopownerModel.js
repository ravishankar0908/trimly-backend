import mongoose from "mongoose";
import { barberModelMessage } from "../util/responseStatuscodes.js";

const shopownerSchema = mongoose.Schema(
  {
    shopName: {
      type: String,
      required: [true, barberModelMessage.requireshopname],
    },
    city: {
      type: String,
      required: [true, barberModelMessage.requireCity],
    },
    emailAddress: {
      type: String,
      required: [true, barberModelMessage.requireEmail],
    },
    phoneNumber: {
      type: Number,
      required: [true, barberModelMessage.requirePhone],
    },
    password: {
      type: String,
      required: [true, barberModelMessage.requirePassword],
    },
    confirmPassword: {
      type: String,
      required: [true, barberModelMessage.requireConfirmPassword],
    },
    role: {
      type: String,
      required: [true, barberModelMessage.requireRole],
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const shopownerModel = mongoose.model("shopOwnerCollection", shopownerSchema);

export default shopownerModel;
