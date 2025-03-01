import express from "express";
import { recommendBooks } from "../controllers/openai.controller.js";

const router = express.Router();

router.post("/recommend", recommendBooks);

export default router;
