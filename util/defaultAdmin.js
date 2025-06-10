import bcrypt from "bcrypt";
import adminModel from "../models/adminModel.js";
import { messages } from "./responseStatuscodes.js";
export const defaultAdmin = async () => {
  try {
    const emailAddress = process.env.ADMIN_EMAIL;
    const checkEmail = await adminModel.findOne({ emailAddress });

    if (checkEmail) {
      return;
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(adminPassword, salt);

    const insertAdmin = await adminModel.create({ emailAddress, password });
    if (!insertAdmin) {
      console.log(messages.adminCreationFailed);
    }
    console.log(messages.adminCreated);
  } catch (error) {
    console.log(error.message, ":", messages.serverErrorMessage);
  }
};
