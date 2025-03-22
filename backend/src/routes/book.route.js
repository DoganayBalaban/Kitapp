import express from "express";
import {
  searchBooks,
  getBookDetails,
  getFeaturedBooks,
  addToReadingList,
  getReadingList,
  deleteReadingList,
} from "../controllers/book.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Kitapları aramak için
router.post("/search", searchBooks);
router.get("/featured", getFeaturedBooks);
router.post("/addList", protectRoute, addToReadingList);
router.get("/reading-list", protectRoute, getReadingList);
router.delete("/reading-list/:id", protectRoute, deleteReadingList);
router.get("/:id", getBookDetails);

export default router;
