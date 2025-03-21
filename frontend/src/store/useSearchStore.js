import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useSearchStore = create((set) => ({
  bookResults: [],
  userResults: [],
  isLoading: false,

  searchAll: async (query) => {
    if (!query) return;
    set({ isLoading: true });

    try {
      const [bookRes, userRes] = await Promise.all([
        axiosInstance.post("book/search", { q: query }),
        axiosInstance.get(`friends/search?q=${query}`),
      ]);

      set({
        bookResults: bookRes.data.books || [],
        userResults: userRes.data || [],
      });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
