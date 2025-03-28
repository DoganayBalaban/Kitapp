import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useConnectionStore = create((set, get) => ({
  following: [],
  isGettingConnections: false,
  isCreatingConnection: false,
  isDeletingConnection: false,

  fetchFollowing: async () => {
    try {
      const res = await axiosInstance.get("/friends/following");
      set({ following: res.data });
    } catch (err) {
      console.error("Takip edilenler alınamadı", err);
    }
  },

  followUser: async (userId) => {
    set({ isCreatingConnection: true });
    try {
      await axiosInstance.post(`/friends/follow/${userId}`);
      const updated = [...get().following, { _id: userId }];
      set({ following: updated });

      const { setUser, user } = useAuthStore.getState();
      setUser({
        ...user,
        following: [...user.following, userId],
      });
      toast.success("Takip edildi!");
    } catch (err) {
      toast.error("Takip edilemedi!");
      console.error("Takip etme hatası:", err);
    } finally {
      set({ isCreatingConnection: false });
    }
  },

  unfollowUser: async (userId) => {
    set({ isDeletingConnection: true });
    try {
      await axiosInstance.post(`/friends/unfollow/${userId}`);
      const updated = get().following.filter(
        (u) => u._id !== userId && u !== userId
      );
      set({ following: updated });

      const { setUser, user } = useAuthStore.getState();
      setUser({
        ...user,
        following: user.following.filter((id) => id !== userId),
      });
      toast.success("Takipten çıkıldı!");
    } catch (err) {
      toast.error("Takipten çıkılamadı!");
      console.error("Takipten çıkma hatası:", err);
    } finally {
      set({ isDeletingConnection: false });
    }
  },

  isFollowing: (userId) => {
    return get().following.some((u) => u._id === userId || u === userId);
  },
}));
