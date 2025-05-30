import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { statusCodes, messages } from "../util/responseStatuscodes.js";
export const userLogin = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    const userCheck = await userModel.findOne({ emailAddress });
    const payload = { id: userCheck._id, email: userCheck.emailAddress };

    if (userCheck === null) {
      return res.status(statusCodes.notFound).json({
        message: messages.emailNotFound,
      });
    }
    const encryptedPassword = userCheck.password;
    const passwordMatch = await bcrypt.compare(password, encryptedPassword);
    if (!passwordMatch) {
      return res.status(statusCodes.badreq).json({
        message: messages.passwordIncorrect,
      });
    }

    const jwtToken = jwt.sign(payload, process.env.jwt_secret_key, {
      expiresIn: "10m",
    });

    const refreshToken = jwt.sign(payload, process.env.refresh_secret_key);

    return res.status(statusCodes.success).json({
      message: messages.loginSuccess,
      jwtToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(statusCodes.serverError).json({
      message: messages.serverErrorMessage,
      error: error.message,
    });
  }
};
