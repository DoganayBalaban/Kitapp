import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "İsim alanı boş bırakılamaz."],
      trim: true,
      minLength: [3, "İsim alanı en az 3 karakter olmalıdır."],
    },
    email: {
      type: String,
      required: [true, "Email alanı boş bırakılamaz."],
      trim: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Geçerli bir e-posta adresi giriniz.",
      ],
    },
    password: {
      type: String,
      required: [true, "Şifre alanı boş bırakılamaz."],
      minLength: [6, "Şifre alanı en az 6 karakter olmalıdır."],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/df1ocaort/image/upload/v1733401822/uh9rnt7dcyeatnvwrlal.png",
    },
    readingList: [
      {
        bookId: String,
        title: String,
        authors: [String],
        description: String,
        publishedDate: String,
        pageCount: Number,
        categories: [String],
        thumbnail: String,
        rating: Number,
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
