import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useBookStore } from "../store/useBookStore";
import { Loader, Star } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const Books = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";
  const {
    books,
    booksBySearch,
    totalItems,
    isGettingBooks,
    error,
    featuredBooks,
    getFeaturedBooks,
  } = useBookStore();
  const [query, setQuery] = useState(searchQuery || "");
  const { user } = useAuthStore();
  useEffect(() => {
    if (searchQuery) {
      booksBySearch(searchQuery);
      user;
    } else {
      getFeaturedBooks();
    }
  }, [searchQuery, user]);
  if (isGettingBooks) {
    return <Loader size={10} className="animate-spin"></Loader>;
  }
  return (
    <div className="container mt-19 p-4">
      <div className="p-4 space-y-2 justify-center items-center flex-col mt-19">
        <div className="text-center">
          <h1 className="text-5xl font-light">Kitapp'a Hoşgeldin</h1>
        </div>
        <div className="text-center">
          <p>
            En sevdiğin kitapla buluş, okuma topluluğunu bul ve okuma hayatını
            yönet.
          </p>
        </div>
      </div>

      {/* Arama Sonuçları */}
      {books.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Arama Sonuçları</h2>
          <div className="">
            <Swiper spaceBetween={40} slidesPerView={5}>
              {books.map((book) => (
                <div
                  key={book.id}
                  className="border p-4 cursor-pointer  rounded-md "
                >
                  <SwiperSlide>
                    <Link to={`/kitaplar/${book.id}`}>
                      <div className="flex-col items-center justify-center p-4 space-y-2 ">
                        <div className="">
                          <img
                            src={book.thumbnail}
                            alt={book.title}
                            className="w-full h-auto object-cover rounded shadow-2xl"
                          />
                        </div>
                        <div className="text-center p-2 space-y-4 ">
                          {" "}
                          <h3 className="font-semibold mt-2">{book.title}</h3>
                          <p className="text-sm font-light">
                            {book.authors.join(", ")}
                          </p>
                          <div className=" flex gap-2">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star
                                key={index}
                                className={
                                  index < book.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-400"
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <div className="mx-15">
          <div>
            {" "}
            <h2 className="text-3xl font-light mb-2">Şu anda Popüler</h2>
            <div className="">
              <Swiper spaceBetween={40} slidesPerView={5}>
                {featuredBooks.map((book) => (
                  <div key={book.id} className="border p-4  rounded-md">
                    <SwiperSlide>
                      <Link to={`/kitaplar/${book.id}`}>
                        <div className="flex-col items-center justify-center p-4 space-y-2">
                          <div className="">
                            <img
                              src={book.thumbnail}
                              alt={book.title}
                              className="w-full h-auto object-cover rounded shadow-2xl"
                            />
                          </div>
                          <div className="text-center p-2 space-y-4 flex flex-col justify-center items-center">
                            <h3 className="font-semibold mt-2">{book.title}</h3>
                            <p className="text-sm font-light">
                              {book.authors.join(", ")}
                            </p>
                            <div className=" flex gap-2">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                  key={index}
                                  className={
                                    index < book.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-400"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>
            </div>
            <h2 className="text-3xl font-light mb-2">Okumaya Devam Et</h2>
            <div className="">
              <Swiper spaceBetween={40} slidesPerView={5}>
                {user.readingList.map((book) => (
                  <div key={book.id} className="border p-4  rounded-md">
                    <SwiperSlide>
                      <Link to={`/kitaplar/${book.bookId}`}>
                        <div className="flex-col items-center justify-center p-4 space-y-2">
                          <div className="">
                            <img
                              src={book.thumbnail}
                              alt={book.title}
                              className="w-full h-auto object-cover rounded shadow-2xl"
                            />
                          </div>
                          <div className="text-center p-2 space-y-4 flex flex-col justify-center items-center">
                            <h3 className="font-semibold mt-2">{book.title}</h3>
                            <p className="text-sm font-light">
                              {book.authors.join(", ")}
                            </p>
                            <div className=" flex gap-2">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                  key={index}
                                  className={
                                    index < book.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-400"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
