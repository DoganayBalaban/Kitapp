import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useRecommendationStore = create((set, get) => ({
  likedBooks: "",
  dislikedBooks: "",
  recommendations: [], // recommendations artık bir array
  loading: false,

  setLikedBooks: (books) => set({ likedBooks: books }),
  setDislikedBooks: (books) => set({ dislikedBooks: books }),

  getRecommendations: async () => {
    set({ loading: true });
    try {
      const { likedBooks, dislikedBooks } = get();

      const res = await axiosInstance.post("ai/recommend", {
        likedBooks: likedBooks.split(",").map((b) => b.trim()), // Fazla boşlukları temizle
        dislikedBooks: dislikedBooks.split(",").map((b) => b.trim()),
      });

      set({ recommendations: res.data.books || [] });
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      set({ recommendations: [] }); // Hata alırsa boş array set et
    } finally {
      set({ loading: false });
    }
  },
}));
