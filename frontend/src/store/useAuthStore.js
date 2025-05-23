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
      await get().checkAuth();
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
      await get().checkAuth();
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
      await get().checkAuth();
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
  getFriendsReadingLists: async () => {
    const { user } = get();
    if (!user?.following?.length) return [];

    try {
      const results = await Promise.all(
        user.following.map(async (friendId) => {
          const res = await axiosInstance.get(`/friends/${friendId}`);
          return {
            id: friendId,
            name: res.data.name,
            avatar: res.data.avatar,
            readingList: res.data.readingList || [],
          };
        })
      );
      return results;
    } catch (error) {
      console.error("Arkadaşların okuma listesi alınamadı:", error);
      toast.error("Arkadaş kitapları yüklenemedi");
      return [];
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
  setUser: (newUser) => set({ user: newUser }),
}));
