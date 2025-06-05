import express from "express";
import { getAllShopOwners } from "../controllers/shopownerController.js";
import { userAuthourization } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.get("/", userAuthourization, getAllShopOwners);

export default router;
