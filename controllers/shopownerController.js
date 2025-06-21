import shopownerModel from "../models/shopownerModel.js";
import { messages, statusCodes } from "../util/responseStatuscodes.js";

export const getAllShopOwners = async (req, res) => {
  try {
    const shopowners = await shopownerModel.find({});

    let activeShopOwners = shopowners.filter((shop) => !shop.isDelete);

    if (activeShopOwners.length === 0) {
      return res.status(statusCodes.success).json({
        message: messages.noShopowners,
        data: [],
      });
    }

    return res.status(statusCodes.success).json({
      message: messages.shopownersList,
      data: activeShopOwners,
    });
  } catch (error) {
    return res.status(statusCodes.serverError).json({
      message: messages.serverErrorMessage,
      error: error.message,
    });
  }
};
