import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { BookOpen, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <BookOpen className="w-12 h-12 mx-auto" />
        <h2 className="text-2xl font-bold text-center">Giriş Yap</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Şifre
            </label>
            <div className="flex items-center gap-3 ">
              <input
                id="password"
                name="password"
                {...(showPassword ? { type: "text" } : { type: "password" })}
                required
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Giriş Yap
          </button>
        </form>
        <div className="flex justify-between text-sm mt-4">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Şifremi Unuttum
          </a>
          <a href="/register" className="text-blue-600 hover:underline">
            Hesap Oluştur
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
