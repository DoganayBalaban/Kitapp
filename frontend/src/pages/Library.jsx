import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useBookStore } from "../store/useBookStore";
import {
  MessageSquareMore,
  Star,
  Loader,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const SwipeableBook = ({ book, onUpdateStatus, onRemove }) => {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const [nextStatus, setNextStatus] = useState(null);
  const [direction, setDirection] = useState(null); // "left" | "right"

  const getSwipeResult = (durum, direction) => {
    if (durum === "Okunuyor" && direction === "right") return "Okunacak";
    if (durum === "Okunacak" && direction === "right") return "Okundu";
    if (durum === "Okunacak" && direction === "left") return "Okunuyor";
    if (durum === "Okundu" && direction === "left") return "Okunacak";
    return null;
  };

  const bind = useDrag(({ down, movement: [mx] }) => {
    if (!down) {
      const swipeDirection = mx > 100 ? "right" : mx < -100 ? "left" : null;
      const next = swipeDirection
        ? getSwipeResult(book.durum, swipeDirection)
        : null;

      if (next) {
        onUpdateStatus(book.bookId, next);
        if (window.navigator.vibrate) {
          window.navigator.vibrate(50);
        }
      }

      setNextStatus(null);
      setDirection(null);
      api.start({ x: 0 });
    } else {
      api.start({ x: mx });

      const swipeDirection = mx > 40 ? "right" : mx < -40 ? "left" : null;
      const next = swipeDirection
        ? getSwipeResult(book.durum, swipeDirection)
        : null;
      setNextStatus(next);
      setDirection(swipeDirection);
    }
  });

  const bgColor =
    direction === "right"
      ? "bg-green-100"
      : direction === "left"
      ? "bg-red-100"
      : "";

  const arrowIcon =
    direction === "right" ? (
      <ArrowRight className="w-6 h-6 text-green-500" />
    ) : direction === "left" ? (
      <ArrowLeft className="w-6 h-6 text-red-500" />
    ) : null;

  return (
    <div className={`relative w-full mb-6 overflow-x-hidden transition`}>
      {nextStatus && (
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0 ${bgColor}`}
        >
          <div className="flex items-center gap-2 opacity-60">
            {arrowIcon}
            <p className="text-xl font-semibold text-[#59461B]">{nextStatus}</p>
          </div>
        </div>
      )}

      <animated.div
        {...bind()}
        style={{ x }}
        className="relative z-10 bg-[#F3ECD6] p-6 rounded-xl shadow-md flex items-center justify-between"
      >
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-24 h-auto object-cover rounded shadow"
        />
        <div className="mx-6 flex-1">
          <h3 className="text-lg font-semibold text-[#565353]">{book.title}</h3>
          <p className="text-[#7D6222]">{book.authors.join(", ")}</p>
          <div className="flex gap-1 mt-2">
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
          <p className="mt-2 text-sm text-gray-600">
            Eklenme: {book.publishedDate}
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            className="border text-sm px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
            onClick={() => onRemove(book.bookId)}
          >
            Listeden Çıkar
          </button>
          <Link
            to={`/kitaplar/${book.bookId}`}
            className="flex flex-col items-center gap-1 text-blue-500 hover:underline"
          >
            <MessageSquareMore className="w-5 h-5" />
            <p>İnceleme Yaz</p>
          </Link>
        </div>
      </animated.div>
    </div>
  );
};

const Library = () => {
  const {
    deleteReadingList,
    fetchReadingList,
    gettingReadingList,
    readingList,
    updateBookStatus,
  } = useBookStore();

  const [bookState, setBookState] = useState("Okunacak");

  useEffect(() => {
    fetchReadingList();
  }, []);

  const handleUpdateStatus = (bookId, newStatus) => {
    updateBookStatus(bookId, newStatus);
  };

  return (
    <div className="mt-20 bg-[#FCFCFF] min-h-screen">
      <div className="p-4 gap-2 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center p-3 space-y-2">
          <h1 className="font-light text-4xl tracking-wider">Kitaplığın</h1>
          <p className="text-md">Tüm favori kitaplarını burada oku</p>
        </div>

        {/* Durum Seçici Butonlar */}
        <div className="flex space-x-2 bg-[#E8E1C6] rounded-full p-1">
          {["Okunuyor", "Okunacak", "Okundu"].map((durum) => (
            <button
              key={durum}
              onClick={() => setBookState(durum)}
              className={`px-6 py-2 rounded-full text-md font-medium transition-all duration-300
                ${
                  bookState === durum
                    ? "bg-[#59461B] text-white shadow"
                    : "text-black"
                }`}
            >
              {durum}
            </button>
          ))}
        </div>
        <p className="mt-4">Kitapların durumunu değiştirmek için kaydır!</p>
      </div>

      <div className="px-10 mt-10">
        {gettingReadingList ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-10 h-10 animate-spin text-gray-500" />
          </div>
        ) : readingList.filter((book) => book.durum === bookState).length ===
          0 ? (
          <div className="text-center text-gray-500 py-20">
            Bu kategoride kitap bulunmuyor.
          </div>
        ) : (
          readingList
            .filter((book) => book.durum === bookState)
            .map((book) => (
              <SwipeableBook
                key={book.bookId}
                book={book}
                onUpdateStatus={handleUpdateStatus}
                onRemove={deleteReadingList}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default Library;
