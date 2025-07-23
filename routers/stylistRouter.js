import {
  getAllSpecialization,
  getAllStylist,
  insertSpecialization,
  insertStylist,
  shopAndStylist,
  shopswithStylist,
} from "../controllers/stylistController.js";
import { userAuthourization } from "../middlewares/userMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/add-specialization", userAuthourization, insertSpecialization);
router.get("/specialization", userAuthourization, getAllSpecialization);
router.post("/add-stylist", userAuthourization, insertStylist);
router.get("/", userAuthourization, getAllStylist);
router.get("/shopandstylist", userAuthourization, shopAndStylist);
router.get("/shopswithstylist", userAuthourization, shopswithStylist);
export default router;
