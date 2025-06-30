import mongoose from "mongoose";
import specializationModel from "../models/stylistModel.js";
import { messages, statusCodes } from "../util/responseStatuscodes.js";
debugger;
export const insertSpecialization = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { shopId } = req.query;
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
