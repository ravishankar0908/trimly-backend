import shopownerModel from "../models/shopownerModel.js";
import { messages, statusCodes } from "../util/responseStatuscodes.js";
import mongoose from "mongoose";

export const getAllShopOwners = async (req, res) => {
  try {
    let { pageNumber, itemsPerPage } = req.query;
    const skip = (pageNumber - 1) * itemsPerPage;

    const totalCount = await shopownerModel.countDocuments({ isDelete: false });
    const shopowners = await shopownerModel
      .find({ isDelete: false })
      .limit(itemsPerPage)
      .skip(skip);

    if (shopowners.length === 0) {
      return res.status(statusCodes.success).json({
        message: messages.noShopowners,
        data: [],
      });
    }

    return res.status(statusCodes.success).json({
      message: messages.shopownersList,
      data: shopowners,
      totalCount,
    });
  } catch (error) {
    return res.status(statusCodes.serverError).json({
      message: messages.serverErrorMessage,
      error: error.message,
    });
  }
};

export const deleteShops = async (req, res) => {
  try {
    const { userId } = req.query;
    const deleteShop = await shopownerModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $set: { isDelete: true } },
      { new: true }
    );

    if (deleteShop) {
      return res.status(statusCodes.success).json({
        message: messages.userDelete,
        data: deleteShop,
      });
    }

    return res.status(statusCodes.success).json({
      message: messages.userNotDelete,
    });
  } catch (error) {
    return res.status(statusCodes.serverError).json({
      message: messages.serverErrorMessage,
      error: error.message,
    });
  }
};
