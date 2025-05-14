import express from "express"
import { allUserList, userById, userInsert, userLogin } from "../controllers/userController.js";
import { userAuthourization } from "../middlewares/userMiddleware.js";
const router = express.Router();

router.post('/insert', userInsert);
router.post('/login', userLogin);
router.get('/', userAuthourization, allUserList);
router.get('/userbyid', userById);

export default router;