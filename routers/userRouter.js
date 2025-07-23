import express from "express";
import {
  allUserList,
  deleteUsers,
  userById,
} from "../controllers/userController.js";
import { alluserAuthourization } from "../middlewares/alluserMiddleware.js";
const router = express.Router();

router.get("/", alluserAuthourization, allUserList);
router.get("/userbyid", alluserAuthourization, userById);
router.patch("/delete", alluserAuthourization, deleteUsers);

export default router;
