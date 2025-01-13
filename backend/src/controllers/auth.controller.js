import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";

export const signupRoute = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Lütfen tüm alanları doldurunuz." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Şifre en az 6 karakter olmalıdır." });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Bu e-posta adresi zaten kullanılıyor." });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPass,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      });
    } else {
      res.status(400).json({ message: "Kullanıcı oluşturulamadı." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
export const loginRoute = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Lütfen tüm alanları doldurunuz." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email ya da şifre hatalı." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email ya da şifre hatalı." });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
export const logoutRoute = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Çıkış yapıldı." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
export const updateProfileRoute = async (req, res) => {
  res.send("Login route");
};

export const meAuthRoute = async (req, res) => {
  res.send("Login route");
};
