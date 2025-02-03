import User from "../models/user.model.js";

export const followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    if (userId === currentUserId) {
      return res.status(400).json({ message: "Kendinizi takip edemezsiniz." });
    }
    const userToFollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    if (currentUser.following.includes(userId)) {
      return res.status(400).json({ message: "Zaten takip ediyorsunuz." });
    }
    currentUser.following.push(userId);
    userToFollow.followers.push(currentUserId);

    await currentUser.save();
    await userToFollow.save();
    res.status(200).json({ message: "Kullanıcı takip edildi." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    if (userId === currentUserId) {
      return res
        .status(400)
        .json({ message: "Kendinizi takipten çıkamazsınız." });
    }
    const userToUnfollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    if (!currentUser.following.includes(userId)) {
      return res.status(400).json({ message: "Zaten takip etmiyorsunuz." });
    }
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userId
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUserId
    );

    await currentUser.save();
    await userToUnfollow.save();
    res.status(200).json({ message: "Kullanıcı takipten çıkarıldı." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
export const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "following",
      "name email avatar"
    );
    res.status(200).json(user.following);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
export const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "followers",
      "name email avatar"
    );
    res.status(200).json(user.followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
