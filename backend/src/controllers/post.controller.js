import Post from "../models/post.model.js";
export const createPost = async (req, res) => {
  try {
    const { bookId, title, content } = req.body;
    const userId = req.user;

    if (!bookId || !title || !content) {
      return res.status(400).json({ message: "Tüm alanları doldurunuz." });
    }
    const newPost = new Post({
      bookId,
      title,
      content,
      user: userId,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Post oluşturma hatası:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
export const getPostsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const post = await Post.find({ bookId }).populate("user", "-password");
    res.status(200).json(post);
  } catch (error) {
    console.error("Post getirme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
export const getPostByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ user: userId }).populate(
      "user",
      "name avatar"
    );
    if (!post) {
      return res.status(404).json({ message: "Post bulunamadı." });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Post getirme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
export const updatePost = async (req, res) => {};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post bulunamadı." });
    }

    if (post.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Yetkiniz yok." });
    }
    await post.deleteOne();
    res.status(200).json({ message: "Post silindi." });
  } catch (error) {
    console.error("Post silme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
