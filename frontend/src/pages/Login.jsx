import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn, user } = useAuthStore(); // user'ı ekle
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(data);
    if (user) navigate("/kitaplar");
  };
  useEffect(() => {
    if (user) {
      navigate("/kitaplar");
    }
  }, [user]);
  return (
    <div className="h-screen pt-19 grid lg:grid-cols-2 p-6 bg-[#FCFCFF]">
      {/* Left side form */}
      <div className="flex justify-center items-center">
        <div className="flex flex-col space-y-5 p-6 sm:p-12 border rounded shadow-2xl">
          <span className="text-4xl font-extralight ">Merhaba !</span>
          <h1 className="text-5xl font-bold">Kitapp'a Giriş Yap</h1>
          <span className="text-2xl font-extralight">Tamamen Ücretsiz!</span>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 ">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <label>Email</label>
                <input
                  type="email"
                  name="name"
                  id="name"
                  className="p-4 border rounded-md w-auto focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="E-mail'inizi giriniz"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label>Şifre</label>
                <div className="flex justify-center items-center relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="name"
                    id="name"
                    className="p-4 border rounded-md w-96 focus:outline-none focus:ring-2 focus:ring-primary "
                    placeholder="Şifrenizi giriniz"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
              <div className="flex justify-between items-center space-x-10">
                <div className="space-x-2 flex">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="border outline-black rounded"
                  />
                  <label className="font-light text-sm">Beni Hatırla</label>
                </div>
                <div>
                  <Link
                    to="/forgotpassword"
                    className="font-light text-sm text-gray-600"
                  >
                    Şifreni mi unuttun?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  className="bg-black text-white p-4 rounded-md w-full justify-center items-center flex"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Giriş yap"
                  )}
                </button>
              </div>
              <div className="flex justify-center items-center">
                <span className="font-light">
                  Hesabın yok mu?{" "}
                  <Link to="/register" className="text-primary font-bold">
                    Kaydol
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className=" items-center justify-center w-184 hidden sm:block">
        <img src="/Communication.gif" alt="loginicon" />
      </div>
    </div>
  );
};

export default Login;
