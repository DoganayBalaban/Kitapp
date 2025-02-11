import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register, isRegister } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Şifreler eşleşmiyor");
    } else {
      const { confirmPassword, ...rest } = data;
      register(rest);
    }
  };

  return (
    <div className="pt-19 grid lg:grid-cols-2 p-6 bg-[#FCFCFF]">
      {/* Left side form */}
      <div className="flex justify-center items-center">
        <div className="flex flex-col space-y-5 p-6 sm:p-12 border rounded shadow-2xl">
          <span className="text-4xl font-extralight ">Merhaba !</span>
          <h1 className="text-5xl font-bold">Sign up to</h1>
          <span className="text-2xl font-extralight">Kitapp for free!</span>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 ">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="p-4 border rounded-md w-auto focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="E-mail'inizi giriniz"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label>İsim</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="p-4 border rounded-md w-auto focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="E-mail'inizi giriniz"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
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
                    value={data.password}
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
              <div className="flex flex-col space-y-2">
                <label>Şifre Tekrar</label>
                <div className="flex justify-center items-center relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="name"
                    id="name"
                    className="p-4 border rounded-md w-96 focus:outline-none focus:ring-2 focus:ring-primary "
                    placeholder="Şifrenizi doğrulayınız"
                    value={data.confirmPassword}
                    onChange={(e) =>
                      setData({ ...data, confirmPassword: e.target.value })
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
              <div>
                <button
                  className="bg-black text-white p-4 rounded-md w-full justify-center items-center flex"
                  disabled={isRegister}
                >
                  {isRegister ? <Loader className="animate-spin" /> : "Sign up"}
                </button>
              </div>
              <div className="flex justify-center items-center">
                <span className="font-light">
                  Already have an Account?{" "}
                  <Link to="/login" className="text-primary font-bold">
                    Sign in
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

export default Register;
