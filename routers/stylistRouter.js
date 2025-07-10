import {
  getAllSpecialization,
  insertSpecialization,
  insertStylist,
} from "../controllers/stylistController.js";
import { userAuthourization } from "../middlewares/userMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/add-specialization", userAuthourization, insertSpecialization);
router.get("/specialization", userAuthourization, getAllSpecialization);
router.post("/add-stylist", userAuthourization, insertStylist);
export default router;
