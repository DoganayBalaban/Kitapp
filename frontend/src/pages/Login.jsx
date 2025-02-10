import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="h-screen pt-19 grid lg:grid-cols-2 p-6 bg-[#FCFCFF]">
      {/* Left side form */}
      <div className="flex justify-center items-center">
        <div className="flex flex-col space-y-5 p-6 sm:p-12 border rounded shadow-2xl">
          <span className="text-4xl font-extralight ">Merhaba !</span>
          <h1 className="text-5xl font-bold">Sign in to</h1>
          <span className="text-2xl font-extralight">Kitapp for free!</span>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 ">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <label>Kullanıcı adı</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="p-4 border rounded-md w-auto focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Adınızı giriniz"
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
                  <label className="font-light text-sm">Remember Me</label>
                </div>
                <div>
                  <Link
                    to="/forgotpassword"
                    className="font-light text-sm text-gray-600"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div>
                <button className="bg-black text-white p-4 rounded-md w-full">
                  Sign in
                </button>
              </div>
              <div className="flex justify-center items-center">
                <span className="font-light">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary font-bold">
                    Sign up
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center w-184">
        <img src="/Communication.gif" alt="loginicon" />
      </div>
    </div>
  );
};

export default Login;
