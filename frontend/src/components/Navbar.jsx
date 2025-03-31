import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  LogOut,
  Book,
  BookA,
  Search,
  Library,
  SearchSlashIcon,
  SearchIcon,
  FileQuestion,
  ShieldQuestionIcon,
  CircleHelp,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/arama?query=${search}`);
  };
  const handleLogout = async () => {
    await logout();
    navigate("/"); // çıkış yaptıktan sonra ana sayfaya yönlendir
  };
  return (
    <header
      className="bg-[#FCFCFF]  border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full mt-3">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Book className=" text-primary size-12" />
              </div>
              <h1 className="text-lg font-bold">Kitapp</h1>
            </Link>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex justify-center items-center"
          >
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
              <input
                type="text"
                className="p-2 pl-12 w-68 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="İsim, kitap, yazar ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>

          <div className="flex items-center gap-6">
            <Link
              to={"/neokusam"}
              className={`
              btn btn-sm gap-2 transition-colors flex flex-col items-center hover:bg-gray-200 rounded-md p-4
              
              `}
            >
              <CircleHelp className="w-6 h-6" />
              <span className="hidden sm:inline">Ne Okusam</span>
            </Link>
            <Link
              to={"/kitaplar"}
              className={`
              btn btn-sm gap-2 transition-colors flex flex-col items-center hover:bg-gray-200 rounded-md p-4
              
              `}
            >
              <BookA className="w-6 h-6" />
              <span className="hidden sm:inline">Kitaplar</span>
            </Link>

            {user && (
              <>
                <Link
                  to={"/kütüphane"}
                  className={`
              btn btn-sm gap-2  transition-colors flex flex-col items-center hover:bg-gray-200 rounded-md p-4
            
              `}
                >
                  <Library className="w-6 h-6" />
                  <span className="hidden sm:inline">Kütüphanem</span>
                </Link>
                <Link
                  to={"/profil"}
                  className={`btn btn-sm gap-2 flex flex-col items-center hover:bg-gray-200 rounded-md p-4`}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <img
                      src="https://media.istockphoto.com/id/1495088043/tr/vekt%C3%B6r/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=1024x1024&w=is&k=20&c=gKLAWzRAE77Y213dcbWWxa_l3I4FqKoUNTX1gPk363E="
                      alt="avatar"
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span className="hidden sm:inline">Profil</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="gap-2 flex flex-col items-center hover:bg-gray-200 rounded-md p-4 cursor-pointer"
                >
                  <LogOut className="w-6 h-6" />
                  <span className="hidden sm:inline">Çıkış yap</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
