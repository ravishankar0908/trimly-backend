import shopownerModel from "../models/shopownerModel.js";
import { messages, statusCodes } from "../util/responseStatuscodes.js";

export const getAllShopOwners = async (req, res) => {
  try {
    let { pageNumber, itemsPerPage } = req.query;
    const skip = (pageNumber - 1) * itemsPerPage;

    const totalCount = await shopownerModel.countDocuments({ isDelete: false });
    const shopowners = await shopownerModel
      .find({ isDelete: false })
      .limit(itemsPerPage)
      .skip(skip);

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
      totalCount,
    });
  } catch (error) {
    return res.status(statusCodes.serverError).json({
      message: messages.serverErrorMessage,
      error: error.message,
    });
  }
};
