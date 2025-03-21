import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchStore } from "../store/useSearchStore";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

const Arama = () => {
  const [params] = useSearchParams();
  const query = params.get("query");

  const { bookResults, userResults, isLoading, searchAll } = useSearchStore();

  useEffect(() => {
    if (query) searchAll(query);
  }, [query]);

  return (
    <div className="mt-24 p-4 max-w-5xl mx-auto ">
      <h1 className="text-2xl mb-4">"{query}" için arama sonuçları</h1>

      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader className="w-24 h-24 animate-spin" />
        </div>
      ) : (
        <>
          {userResults.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Kullanıcılar</h2>
              <div className="flex space-x-10">
                {userResults.map((user) => (
                  <Link
                    key={user._id}
                    to={`/profil/${user._id}`}
                    className="flex items-center flex-col hover:bg-gray-200"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-32 h-32 rounded-full object-cover "
                    />
                    <span>{user.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {bookResults.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Kitaplar</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {bookResults.map((book) => (
                  <Link key={book.bookId} to={`/kitaplar/${book.bookId}`}>
                    <div className="flex flex-col items-center">
                      <img
                        src={book.thumbnail}
                        alt={book.title}
                        className="w-32 h-48 object-cover rounded shadow"
                      />
                      <p className="mt-2 text-center text-sm font-medium">
                        {book.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {bookResults.length === 0 && userResults.length === 0 && (
            <p>Hiçbir sonuç bulunamadı.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Arama;
