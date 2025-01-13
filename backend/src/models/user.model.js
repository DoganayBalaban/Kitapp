import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    default:
      "https://res.cloudinary.com/demo/image/upload/v1234567890/default-avatar.png", // Varsayılan avatar URL'si
  },
  readingList: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      status: {
        type: String,
        enum: ["okundu", "okunuyor", "okunacak"],
        default: "okunacak",
      },

      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
