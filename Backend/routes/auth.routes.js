import express from "express";
import {
  googleLogin,
  googleCallback
} from "../controller/authController.js";

const router = express.Router();

router.get("/auth/google", googleLogin);
router.get("/oauth2callback", googleCallback);

export default router;
