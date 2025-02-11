import express from "express";
import {
  searchBooks,
  getBookDetails,
  getFeaturedBooks,
} from "../controllers/book.controller.js";

const router = express.Router();

// Kitapları aramak için
router.post("/search", searchBooks);
router.get("/featured", getFeaturedBooks);
// Tek bir kitabın detayını almak için
router.get("/:id", getBookDetails);

export default router;
