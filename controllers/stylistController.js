import mongoose from "mongoose";
import specializationModel from "../models/stylistModel.js";
import { messages, statusCodes } from "../util/responseStatuscodes.js";
import { ObjectId } from "mongodb";
debugger;
export const insertSpecialization = async (req, res) => {
  try {
    const { name, description } = req.body;
    const shopId = req.query.userId;

    const insert = await specializationModel.create({
      name,
      description,
      shopId: new mongoose.Types.ObjectId(shopId),
    });

    if (!insert) {
      return res.status(statusCodes.badreq).json({
        message: messages.notInserted,
      });
    }

    return res.status(statusCodes.created).json({
      message: messages.inserted,
    });
  } catch (error) {
    return res.status(statusCodes.serverError).json({
      message: messages.serverErrorMessage,
      error: error.message,
    });
  }
};

export const getAllSpecialization = async (req, res) => {
  try {
    const { userId, pageNumber, itemsPerPage } = req.query;
    const skip = (pageNumber - 1) * itemsPerPage;
    const totalCount = await specializationModel.countDocuments({
      shopId: new ObjectId(userId),
    });
    const specialization = await specializationModel
      .find({
        shopId: new ObjectId(userId),
      })
      .limit(itemsPerPage)
      .skip(skip);

    if (specialization.length === 0) {
      return res.status(statusCodes.success).json({
        message: messages.emptyContent,
        data: [],
      });
    }

    return res.status(statusCodes.success).json({
      message: messages.inserted,
      data: specialization,
      totalCount,
    });
  } catch (error) {
    return res.status(statusCodes.serverError).json({
      message: messages.serverErrorMessage,
      error: error.message,
    });
  }
};
