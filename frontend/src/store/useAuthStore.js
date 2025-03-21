import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set, get) => ({
  user: null,
  userProfile: null,
  isCheckingAuth: true,
  isRegister: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ user: res.data });
    } catch (error) {
      console.error(error);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  register: async (data) => {
    set({ isRegister: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ user: res.data });
      toast.success("Kayıt Başarılı!");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isRegister: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ user: res.data });
      toast.success("Giriş Başarılı!");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success("Çıkış Başarılı!");
    } catch (error) {
      console.error(error);
      toast.error("Çıkış Yapılamadı!");
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ user: res.data });
      toast.success("Profil Güncellendi!");
    } catch (error) {
      console.error(error);
      toast.error("Profil Güncellenemedi!");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  fetchUserProfile: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/friends/${id}`);
      set({ userProfile: res.data });
    } catch (err) {
      console.error("Kullanıcı profili getirilemedi:", err);
      toast.error("Kullanıcı profili getirilemedi");
    } finally {
      set({ isLoading: false });
    }
  },
}));
