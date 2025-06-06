import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useBookStore = create((set, get) => ({
  books: [],
  book: null,
  readingList: [],
  gettingReadingList: false,
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
  updateBookStatus: async (bookId, newStatus) => {
    set((state) => ({
      readingList: state.readingList.map((book) =>
        book.bookId === bookId ? { ...book, durum: newStatus } : book
      ),
    }));

    try {
      await axiosInstance.patch(
        "/book/update-book-status", // Route'un yoluna göre düzenle
        { bookId, newStatus }
      );
      toast.success("Durum güncellendi");
    } catch (error) {
      console.error("Durum güncelleme hatası:", error);
      toast.error("Durum güncellenemedi");
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
    set({ gettingReadingList: true });
    try {
      const res = await axiosInstance.get("book/reading-list");
      set({ readingList: res.data });
    } catch (error) {
      console.error(error);
      toast.error("Okuma listesi getirilemedi");
    } finally {
      set({ gettingReadingList: false });
    }
  },
  deleteReadingList: async (bookId) => {
    try {
      await axiosInstance.delete(`book/reading-list/${bookId}`);
      toast.success("Kitap okuma listenden silindi");
      set((state) => ({
        readingList: state.readingList.filter((book) => book.bookId !== bookId),
      }));
    } catch (error) {
      console.error(
        "Kitap okunma listesinden silinirken hata oluştu:",
        error.message
      );
      toast.error("Kitap okuma listenden silinemedi");
    }
  },
}));
