import express from "express";
import {
  logout,
  refreshToken,
  userInsert,
  userLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/registration", userInsert);
router.post("/login", userLogin);

router.post("/refreshtoken", refreshToken);

router.post("/logout", logout);

export default router;
