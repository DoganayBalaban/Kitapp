import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Landing";
import Login from "./pages/Login";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Books from "./pages/Books";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

const App = () => {
  const { user, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(user);
  if (isCheckingAuth && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={10} className="animate-spin"></Loader>
      </div>
    );
  }
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={!user ? <Landing /> : <Navigate to="/kitaplar" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/kitaplar" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/kitaplar" />}
        />
        <Route path="/kitaplar" element={<Books />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
