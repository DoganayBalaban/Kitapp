import React from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Book, BookA, Search, Library } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
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

          <div className="flex items-center gap-6">
            <Link
              to={"/kitaplar"}
              className={`
              btn btn-sm gap-2 transition-colors flex items-center hover:bg-gray-200 rounded-md p-2
              
              `}
            >
              <BookA className="w-4 h-4" />
              <span className="hidden sm:inline">Kitaplar</span>
            </Link>
            <Link
              to={"/ara"}
              className={`
              btn btn-sm gap-2 transition-colors flex items-center hover:bg-gray-200 rounded-md p-2
              
              `}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Kitap Ara</span>
            </Link>

            {user && (
              <>
                <Link
                  to={"/kütüphane"}
                  className={`
              btn btn-sm gap-2 transition-colors flex items-center hover:bg-gray-200 rounded-md p-2
            
              `}
                >
                  <Library className="w-4 h-4" />
                  <span className="hidden sm:inline">Kütüphanem</span>
                </Link>
                <Link
                  to={"/profile"}
                  className={`btn btn-sm gap-2 flex items-center hover:bg-gray-200 rounded-md p-2`}
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profil</span>
                </Link>

                <button
                  onClick={logout}
                  className="gap-2 flex items-center hover:bg-gray-200 rounded-md p-2 cursor-pointer"
                >
                  <LogOut className="size-5" />
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
