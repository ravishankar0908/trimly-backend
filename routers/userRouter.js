import express from "express"
import { userInsert, userLogin } from "../controllers/userController.js";
const router = express.Router();

router.post('/insert', userInsert);
router.post('/login', userLogin);

export default router;