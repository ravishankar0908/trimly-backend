import shopownerModel from "../models/shopownerModel.js";
import { messages, statusCodes } from "../util/responseStatuscodes.js";

export const getAllShopOwners = async (req, res) => {
  try {
    const shopowners = await shopownerModel.find({});
    if (shopowners.length === 0) {
      res.status(statusCodes.notFound).json({
        message: messages.noShopowners,
      });
    }

    res.status(statusCodes.success).json({
      message: messages.shopownersList,
      data: shopowners,
    });
  } catch (error) {}
};
