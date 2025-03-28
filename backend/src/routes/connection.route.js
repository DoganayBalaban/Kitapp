import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
  searchUser,
  getProfile,
} from "../controllers/connection.controller.js";

router.post("/follow/:userId", protectRoute, followUser);
router.post("/unfollow/:userId", protectRoute, unfollowUser);
router.get("/followers/:id?", protectRoute, getFollowers);
router.get("/following/:id?", protectRoute, getFollowing);
router.get("/search", searchUser);
router.get("/:id", getProfile);

export default router;
