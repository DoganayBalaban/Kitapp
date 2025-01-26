import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";

export const sendConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const from = req.user._id;
    if (from.toString() === userId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot send request to yourself" });
    }
    if (req.user.friends.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You are already connected with this user" });
    }
    const existingRequest = await FriendRequest.findOne({
      from,
      to: userId,
      status: "pending",
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }
    const newRequest = new FriendRequest({
      from,
      to: userId,
    });
    await newRequest.save();
    res.status(201).json({ message: "Request sent successfully" });
  } catch (error) {
    console.error("Error in sendConnectionRequest controller:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const acceptConnectionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await FriendRequest.findById(requestId)
      .populate("from", "name email")
      .populate("to", "name");

    if (!request) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    // check if the req is for the current user
    if (request.to._id.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to accept this request" });
    }

    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ message: "This request has already been processed" });
    }

    request.status = "accepted";
    await request.save();

    // if im your friend then ur also my friend ;)
    await User.findByIdAndUpdate(request.from._id, {
      $addToSet: { friends: userId },
    });
    await User.findByIdAndUpdate(userId, {
      $addToSet: { friends: request.sender._id },
    });

    res.json({ message: "Connection accepted successfully" });
  } catch (error) {
    console.error("Error in acceptConnectionRequest controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectConnectionRequest = async (req, res) => {
  const { requestId } = req.params;
  const userId = req.user._id;
  try {
    const request = await FriendRequest.findById(requestId);
    if (request.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to reject this request" });
    }
    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Request has already been accepted/rejected" });
    }
    request.status = "rejected";
    await request.save();
    res.status(200).json({ message: "Request rejected successfully" });
  } catch (error) {
    console.error("Error in rejectConnectionRequest controller:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getConnectionRequests = async (req, res) => {
  const userId = req.user._id;
  try {
    const requests = await FriendRequest.find({
      to: userId,
      status: "pending",
    }).populate("from", "name avatar friends");
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error in getConnectionRequests controller:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getUserConnections = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).populate(
      "friends",
      "name avatar friends"
    );
    res.status(200).json(user.connections);
  } catch (error) {
    console.error("Error in getUserConnections controller:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const removeConnection = async (req, res) => {
  const myId = req.user._id;
  const { userId } = req.params;
  try {
    await User.findByIdAndUpdate(myId, { $pull: { friends: userId } });
    await User.findByIdAndUpdate(userId, { $pull: { friends: myId } });
    res.status(200).json({ message: "Connection removed successfully" });
  } catch (error) {
    console.error("Error in removeConnection controller:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getConnectionStatus = async (req, res) => {
  const targetUserId = req.params.userId;
  const currentUserId = req.user._id;

  try {
    const currentUser = req.user;
    if (currentUser.friends.includes(targetUserId)) {
      return res.status(200).json({ status: "connected" });
    }
    const pendingRequest = await FriendRequest.findOne({
      $or: [
        { from: currentUserId, to: targetUserId },
        { from: targetUserId, to: currentUserId },
      ],
      status: "pending",
    });
    if (pendingRequest) {
      if (pendingRequest.from.toString() === currentUserId.toString()) {
        return res.status(200).json({ status: "pending" });
      } else {
        return res
          .status(200)
          .json({ status: "received", requestId: pendingRequest._id });
      }
    }
    res.status(200).json({ status: "not_connected" });
  } catch (error) {
    console.error("Error in getConnectionStatus controller:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
