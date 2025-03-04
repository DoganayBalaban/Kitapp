import React from "react";
import { useRecommendationStore } from "../store/useRecommendationStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const Neokusam = () => {
  const {
    likedBooks,
    dislikedBooks,
    recommendations,
    loading,
    setLikedBooks,
    setDislikedBooks,
    getRecommendations,
  } = useRecommendationStore();

  return (
    <div className="p-4 mt-20 h-screen">
      <h2 className="text-lg font-bold">Ne Okusam?</h2>
      <input
        type="text"
        placeholder="Sevdiğin kitapları gir (virgülle ayır)"
        value={likedBooks}
        onChange={(e) => setLikedBooks(e.target.value)}
        className="block w-full p-2 border mt-2"
        disabled={loading} // Yüklenirken input'u disable et
      />
      <input
        type="text"
        placeholder="Sevmediğin kitapları gir (virgülle ayır)"
        value={dislikedBooks}
        onChange={(e) => setDislikedBooks(e.target.value)}
        className="block w-full p-2 border mt-2"
        disabled={loading}
      />
      <button
        onClick={getRecommendations}
        className="mt-3 bg-blue-500 text-white p-2 rounded flex justify-center items-center"
        disabled={loading}
      >
        {loading ? (
          <div className="loader"></div> // Yüklenme efekti
        ) : (
          "Öneri Al"
        )}
      </button>
      {recommendations.length > 0 && (
        <div className="mt-4 p-3 border rounded">
          <>
            <h3 className="font-semibold">Önerilen Kitaplar:</h3>
            <Swiper spaceBetween={40} slidesPerView={5}>
              {recommendations.map((book) => (
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
                          <p className="text-sm font-light">{book.author}</p>
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
          </>
        </div>
      )}
    </div>
  );
};

export default Neokusam;
