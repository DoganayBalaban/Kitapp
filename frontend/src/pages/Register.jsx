import { BookOpen, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register, isRegister } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    register(data);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <BookOpen className="w-12 h-12 mx-auto" />
        <h2 className="text-2xl font-bold text-center">Kayıt Ol</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              İsim
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
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
            Kayıt Ol
          </button>
        </form>
        <div className="flex justify-between text-sm mt-4">
          Bir hesabınız var mı?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
