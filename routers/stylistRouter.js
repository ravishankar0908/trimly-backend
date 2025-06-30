import { insertSpecialization } from "../controllers/stylistController.js";
import { userAuthourization } from "../middlewares/userMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/add", userAuthourization, insertSpecialization);

export default router;
