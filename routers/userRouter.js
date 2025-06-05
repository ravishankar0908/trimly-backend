import express from "express";
import { allUserList, userById } from "../controllers/userController.js";
import { userAuthourization } from "../middlewares/userMiddleware.js";
import { alluserAuthourization } from "../middlewares/alluserMiddleware.js";
const router = express.Router();

router.get("/", alluserAuthourization, allUserList);
router.get("/userbyid", alluserAuthourization, userById);

export default router;
