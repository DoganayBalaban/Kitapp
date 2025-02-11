import React from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Book, BookA, Search, Library } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <header
      className="bg-base-100  border-base-300 fixed w-full top-0 z-40 
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

          <div className="flex items-center gap-6">
            <Link
              to={"/kitaplar"}
              className={`
              btn btn-sm gap-2 transition-colors flex flex-col items-center hover:bg-gray-200 rounded-md p-4
              
              `}
            >
              <BookA className="w-6 h-6" />
              <span className="hidden sm:inline">Kitaplar</span>
            </Link>
            <Link
              to={"/ara"}
              className={`
              btn btn-sm gap-2 transition-colors flex flex-col items-center hover:bg-gray-200 rounded-md p-4
              
              `}
            >
              <Search className="w-6 h-6" />
              <span className="hidden sm:inline">Kitap Ara</span>
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
                  to={"/profile"}
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
                  onClick={logout}
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
