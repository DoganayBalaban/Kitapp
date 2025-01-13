import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({
          message: "Bu işlemi gerçekleştirmek için giriş yapmalısınız.",
        });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Suncu Hatası" });
  }
};
