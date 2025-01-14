import express from "express";
import { searchBooks, getBookDetails } from "../controllers/book.controller.js";

const router = express.Router();

// Kitapları aramak için
router.get("/search", searchBooks);

// Tek bir kitabın detayını almak için
router.get("/:id", getBookDetails);

export default router;
