import express from "express";
import { processSheet } from "../controller/processController.js";

const router = express.Router();

router.post("/process", processSheet);

export default router;
