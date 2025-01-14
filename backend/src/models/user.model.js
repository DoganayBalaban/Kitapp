import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "İsim alanı boş bırakılamaz."],
      trim: true,
      minLength: [5, "İsim alanı en az 5 karakter olmalıdır."],
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
      default: "",
    },
    readingList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserBook",
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
