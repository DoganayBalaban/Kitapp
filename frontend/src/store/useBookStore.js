import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useBookStore = create((set, get) => ({
  books: [],
  book: null,
  readingList: [],
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

  getBookById: async (id) => {
    set({ isGettingBooks: true });
    try {
      const res = await axiosInstance.get(`book/${id}`);
      set({ book: res.data });
    } catch (error) {
      console.error(error);
      toast.error("Kitap getirilemedi");
    } finally {
      set({ isGettingBooks: false });
    }
  },

  addToReadingList: async (book) => {
    try {
      await axiosInstance.post("book/addList", {
        bookId: book.bookId,
        title: book.title,
        authors: book.authors,
        description: book.description,
        publishedDate: book.publishedDate,
        pageCount: book.pageCount,
        categories: book.categories,
        thumbnail: book.thumbnail,
        rating: book.rating,
      });
      toast.success("Kitap okuma listene eklendi");
      set((state) => ({
        readingList: [...state.readingList, book],
      }));
    } catch (error) {
      console.error(
        "Kitap okunma listesine eklenirken hata oluştu:",
        error.message
      );
      toast.error("Kitap okuma listene eklenemedi");
    }
  },

  fetchReadingList: async () => {
    try {
      const res = await axiosInstance.get("book/reading-list");
      set({ readingList: res.data });
    } catch (error) {
      console.error(error);
      toast.error("Okuma listesi getirilemedi");
    }
  },
}));
