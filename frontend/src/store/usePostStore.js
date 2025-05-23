import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const usePostStore = create((set, get) => ({
  posts: [],
  bookDetailsMap: {},
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
      const res = await axiosInstance.get(`/posts/user/${userId}`);
      set({ posts: res.data });
      await get().fetchBookDetailsForPosts(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Postlar getirilemedi.");
    } finally {
      set({ isGettingPosts: false });
    }
  },

  fetchBookDetailsForPosts: async (posts) => {
    const existing = get().bookDetailsMap;
    const newMap = { ...existing };

    await Promise.all(
      posts.map(async (post) => {
        const bookId = post.bookId;
        if (!newMap[bookId]) {
          try {
            const res = await fetch(
              `https://www.googleapis.com/books/v1/volumes/${bookId}`
            );
            const data = await res.json();
            newMap[bookId] = {
              title: data.volumeInfo.title,
              thumbnail: data.volumeInfo.imageLinks?.thumbnail || "",
              authors: data.volumeInfo.authors || [],
            };
          } catch (err) {
            console.error("Kitap bilgisi alınamadı", err);
          }
        }
      })
    );

    set({ bookDetailsMap: newMap });
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
  deletePost: async (postid) => {
    set({ isDeletingPost: true });
    try {
      await axiosInstance.delete(`/posts/${postid}`);
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== postid),
      }));
      toast.success("Post silindi.");
    } catch (error) {
      console.error(error);
      toast.error("Post silinemedi.");
    } finally {
      set({ isDeletingPost: false });
    }
  },
}));
