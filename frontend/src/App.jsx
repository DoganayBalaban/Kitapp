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
import BookDetails from "./pages/BookDetails";
import Library from "./pages/Library";
import Neokusam from "./pages/Neokusam";
import Profil from "./pages/Profil";
import Arama from "./pages/Arama";
import ProfilDetay from "./pages/ProfilDetay";

const App = () => {
  const { user, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
        <Route path="/arama" element={<Arama />} />
        <Route path="/neokusam" element={<Neokusam />} />
        <Route path="/kütüphane" element={<Library />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="/kitaplar/:id" element={<BookDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
