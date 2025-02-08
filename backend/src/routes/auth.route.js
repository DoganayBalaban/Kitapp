import express from "express";
const router = express.Router();
import {
  loginRoute,
  signupRoute,
  logoutRoute,
  updateProfileRoute,
  meAuthRoute,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

router.post("/signup", signupRoute);
router.post("/login", loginRoute);
router.post("/logout", logoutRoute);
router.put("/update-profile", protectRoute, updateProfileRoute);
router.get("/me", protectRoute, meAuthRoute);

export default router;
