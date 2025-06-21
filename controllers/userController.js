import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import { statusCodes, messages } from "../util/responseStatuscodes.js";

export const allUserList = async (req, res) => {
  try {
    const users = await userModel.find({});

    const activeUsers = users.filter((user) => !user.isDelete);

    if (activeUsers.length === 0) {
      return res.status(statusCodes.notFound).json({
        message: messages.noUsers,
        data: [],
      });
    }

    return res.status(statusCodes.success).json({
      message: messages.allUsers,
      data: activeUsers,
    });
  } catch (error) {
    return res.status(statusCodes.serverError).json({
      message: messages.serverErrorMessage,
      error: error.message,
    });
  }
};

export const userById = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await userModel.findById(new mongoose.Types.ObjectId(userId));

    if (!user) {
      return res.status(statusCodes.notFound).json({
        message: messages.invalidUserId,
      });
    }

    return res.status(statusCodes.found).json({
      message: messages.validUserId,
      data: user,
    });
  } catch (error) {
    return res.status(statusCodes.serverError).json({
      message: messages.serverErrorMessage,
      error: error.message,
    });
  }
};
