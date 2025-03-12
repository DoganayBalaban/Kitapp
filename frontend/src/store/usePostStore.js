import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const usePostStore = create((set, get) => ({
  posts: [],
  isCreatingPost: false,
  isUpdatingPost: false,
  isDeletingPost: false,
  isGettingPosts: false,
  getPostByBook: async (bookId) => {
    set({ isGettingPosts: true });
    try {
      const res = await axiosInstance.get(`/posts/${bookId}`);
      set({ posts: res.data });
    } catch (error) {
      console.error(error);
      toast.error("Postlar getirilemedi.");
    } finally {
      set({ isGettingPosts: false });
    }
  },
  getPostByUser: async (userId) => {
    set({ isGettingPosts: true });
    try {
      const res = await axiosInstance.get(`/posts/${userId}`);
      set({ posts: res.data });
    } catch (error) {
      console.error(error);
      toast.error("Postlar getirilemedi.");
    } finally {
      set({ isGettingPosts: false });
    }
  },
  createPost: async (data) => {
    set({ isCreatingPost: true });
    try {
      const res = await axiosInstance.post("/posts/create", data);
      set((state) => ({ posts: [...state.posts, res.data] }));
      toast.success("Post oluşturuldu.");
    } catch (error) {
      console.error(error);
      toast.error("Post oluşturulamadı.");
    } finally {
      set({ isCreatingPost: false });
    }
  },
  updatePost: async (data) => {},
  deletePost: async (bookId) => {},
}));
