import express from "express";
import {
  deleteShops,
  getAllShopOwners,
} from "../controllers/shopownerController.js";
import { userAuthourization } from "../middlewares/userMiddleware.js";
import { alluserAuthourization } from "../middlewares/alluserMiddleware.js";

const router = express.Router();

router.get("/", userAuthourization, getAllShopOwners);
router.patch("/delete", alluserAuthourization, deleteShops);
export default router;
