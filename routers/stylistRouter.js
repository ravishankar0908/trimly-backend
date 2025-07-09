import {
  getAllSpecialization,
  insertSpecialization,
} from "../controllers/stylistController.js";
import { userAuthourization } from "../middlewares/userMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/add", userAuthourization, insertSpecialization);
router.get("/", userAuthourization, getAllSpecialization);

export default router;
