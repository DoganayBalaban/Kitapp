import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useBookStore = create((set, get) => ({
  books: [],
  featuredBooks: [],
  isGettingBooks: false,
  totalItems: 0,
  error: null,
  booksBySearch: async (query) => {
    if (!query) return;
    set({ isGettingBooks: true, error: null });
    try {
      const res = await axiosInstance.post("book/search", { q: query });
      set({ books: res.data.books, totalItems: res.data.totalItems });
    } catch (error) {
      console.error(error);
      toast.error("Kitaplar getirilemedi");
    } finally {
      set({ isGettingBooks: false });
    }
  },
  getFeaturedBooks: async () => {
    set({ isGettingBooks: true, error: null });
    try {
      const res = await axiosInstance.get("book/featured");
      set({ featuredBooks: res.data });
    } catch (error) {
      console.error(error);
      toast.error("Öne çıkan kitaplar getirilemedi");
    } finally {
      set({ isGettingBooks: false });
    }
  },
}));
