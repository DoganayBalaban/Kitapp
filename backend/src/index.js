import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import bodyParser from "body-parser";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

import authRoutes from "./routes/auth.route.js";
import bookRoutes from "./routes/book.route.js";
import postRoutes from "./routes/post.route.js";
import connectionRoutes from "./routes/connection.route.js";
import openaiRoutes from "./routes/openai.route.js";

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/friends", connectionRoutes);
app.use("/api/ai", openaiRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
