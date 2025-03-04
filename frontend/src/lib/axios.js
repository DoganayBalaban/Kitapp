import axios from "axios";
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "/api",
  withCredentials: true,
  maxContentLength: 50 * 1024 * 1024, // 50MB'a kadar izin ver
  maxBodyLength: 50 * 1024 * 1024,
});
