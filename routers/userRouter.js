import express from "express"
import { allUserList, userById, userInsert, userLogin } from "../controllers/userController.js";
const router = express.Router();

router.post('/insert', userInsert);
router.post('/login', userLogin);
router.get('/', allUserList);
router.get('/userbyid', userById);

export default router;