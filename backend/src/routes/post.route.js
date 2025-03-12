import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createPost,
  getPostsByBook,
  updatePost,
  deletePost,
  getPostByUser,
} from "../controllers/post.controller.js";

router.post("/create", protectRoute, createPost);
router.get("/:bookId", getPostsByBook);
router.get("/user/:userId", getPostByUser);
router.put("/:id", protectRoute, updatePost);
router.delete("/:id", protectRoute, deletePost);

export default router;
