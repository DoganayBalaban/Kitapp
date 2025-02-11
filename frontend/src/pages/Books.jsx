import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useBookStore } from "../store/useBookStore";
const Books = () => {
  const {
    books,
    booksBySearch,
    totalItems,
    isGettingBooks,
    error,
    featuredBooks,
    getFeaturedBooks,
  } = useBookStore();
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();

    booksBySearch(query);
  };
  useEffect(() => {
    getFeaturedBooks();
  }, []);
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kitaplar</h1>

      {/* Arama Kutusu */}
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kitap ara..."
          className="p-2 border border-gray-300 rounded-md w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
        >
          Ara
        </button>
      </form>

      {isGettingBooks && <p>Yükleniyor...</p>}

      {/* Arama Sonuçları */}
      {books.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Arama Sonuçları</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {books.map((book) => (
              <div key={book.id} className="border p-2 rounded-md">
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="font-semibold mt-2">{book.title}</h3>
                <p className="text-sm">{book.authors.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Öne Çıkan Kitaplar</h2>
          <div className="">
            <Swiper spaceBetween={50} slidesPerView={3}>
              {featuredBooks.map((book) => (
                <div key={book.id} className="border p-2 rounded-md">
                  <SwiperSlide>
                    {" "}
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="w-full h-auto object-cover rounded"
                    />
                    <h3 className="font-semibold mt-2">{book.title}</h3>
                    <p className="text-sm">{book.authors.join(", ")}</p>
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
