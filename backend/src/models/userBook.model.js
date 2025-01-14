import mongoose from "mongoose";
const userBookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  volumeId: {
    type: String,
    required: true,
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
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

const UserBook = mongoose.model("UserBook", userBookSchema);
export default UserBook;
