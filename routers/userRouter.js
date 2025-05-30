import express from "express";
import {
  allUserList,
  userById,
  userInsert,
} from "../controllers/userController.js";
import { userAuthourization } from "../middlewares/userMiddleware.js";
const router = express.Router();

router.post("/insert", userInsert);
router.get("/", userAuthourization, allUserList);
router.get("/userbyid", userAuthourization, userById);

export default router;
