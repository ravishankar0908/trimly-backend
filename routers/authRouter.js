import express from "express";
import {
  logout,
  refreshToken,
  userLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", userLogin);

router.post("/refreshtoken", refreshToken);

router.post("/logout", logout);

export default router;
