import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { statusCodes, messages } from "../util/responseStatuscodes.js";
import shopownerModel from "../models/shopownerModel.js";
import adminModel from "../models/adminModel.js";

export const userInsert = async (req, res) => {
  try {
    const { role, city, emailAddress, phoneNumber, password, confirmPassword } =
      req.body;

    if (!role) {
      return res.status(statusCodes.notFound).json({
        message: messages.roleNotFound,
      });
    }

    if (password !== confirmPassword) {
      return res.status(statusCodes.unauth).json({
        message: messages.passwordNotMatch,
      });
    }

    const checkEmailConflict =
      (await userModel.findOne({ emailAddress })) ||
      (await shopownerModel.findOne({ emailAddress })) ||
      (await adminModel.findOne({ emailAddress }));

    if (checkEmailConflict)
      return res
        .status(statusCodes.conflict)
        .json({ messages: messages.emailExist, emailAddress });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (role === "user") {
      const { firstName, lastName, gender } = req.body;
      await userModel.create({
        firstName,
        lastName,
        gender,
        city,
        emailAddress,
        phoneNumber,
        password: hashedPassword,
        role,
      });
    } else if (role === "shopowner") {
      const { shopName } = req.body;
      await shopownerModel.create({
        shopName,
        city,
        emailAddress,
        phoneNumber,
        password: hashedPassword,
        role,
      });
    } else {
      return res.status(statusCodes.notAcceptable).json({
        message: messages.roleNotAccepted,
      });
    }

    return res.status(statusCodes.created).json({
      message: messages.registrationSuccess,
      data: {
        emailAddress,
        role,
      },
    });
  } catch (error) {
    return res.status(statusCodes.serverError).json({
      message: messages.serverErrorMessage,
      error: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    const userCheck =
      (await userModel.findOne({ emailAddress })) ||
      (await shopownerModel.findOne({ emailAddress })) ||
      (await adminModel.findOne({ emailAddress }));

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

    const payload = {
      id: userCheck._id,
      email: userCheck.emailAddress,
      role: userCheck.role,
    };

    const jwtToken = jwt.sign(payload, process.env.jwt_secret_key, {
      expiresIn: process.env.jwt_token_validity,
    });

    const refreshToken = jwt.sign(payload, process.env.refresh_secret_key, {
      expiresIn: process.env.refresh_token_validity,
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

    if (!token)
      return res
        .status(statusCodes.notFound)
        .json({ message: messages.invalidToken });

    jwt.verify(token, process.env.refresh_secret_key, (err, user) => {
      if (err)
        return res.status(statusCodes.forbidden).json({ message: err.message });
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const jwtToken = jwt.sign(payload, process.env.jwt_secret_key, {
        expiresIn: process.env.jwt_token_validity,
      });

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
