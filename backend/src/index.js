import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

import authRoutes from "./routes/auth.route.js";
import bookRoutes from "./routes/book.route.js";
import connectionRoutes from "./routes/connection.route.js";
import openaiRoutes from "./routes/openai.route.js";

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/friends", connectionRoutes);
app.use("/api/ai", openaiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
