import express from "express"
import { userInsert } from "../controllers/userController.js";
const router = express.Router();

router.post('/insert', userInsert);

export default router;