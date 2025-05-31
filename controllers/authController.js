import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { statusCodes, messages } from "../util/responseStatuscodes.js";
export const userLogin = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    const userCheck = await userModel.findOne({ emailAddress });
    const payload = { id: userCheck._id, email: userCheck.emailAddress };

    if (!userCheck) {
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

    const refreshToken = jwt.sign(payload, process.env.refresh_secret_key, {
      expiresIn: "1d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //false for dev, set true in prod
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    return res.status(statusCodes.success).json({
      message: messages.loginSuccess,
      jwtToken,
    });
  } catch (error) {
    return res.status(statusCodes.serverError).json({
      message: messages.serverErrorMessage,
      error: error.message,
    });
  }
};

export const refreshToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    console.log(token);

    if (!token)
      return res
        .status(statusCodes.notFound)
        .json({ message: messages.invalidToken });

    jwt.verify(token, process.env.refresh_secret_key, (err, user) => {
      if (err)
        return res.status(statusCodes.forbidden).json({ message: err.message });

      const jwtToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.jwt_secret_key,
        { expiresIn: "10m" }
      );

      res.status(statusCodes.created).json({
        jwtToken,
      });
    });
  } catch (error) {
    return res.status(statusCodes.serverError).json({
      message: messages.serverErrorMessage,
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(statusCodes.success).json({
      message: messages.logout,
    });
  } catch (error) {
    return res.status(statusCodes.serverError).json({
      message: messages.serverErrorMessage,
      error: error.message,
    });
  }
};
