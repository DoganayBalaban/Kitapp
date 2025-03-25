import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBookStore } from "../store/useBookStore";
import { MessageSquareMore, Star, Loader } from "lucide-react";

const Library = () => {
  const {
    deleteReadingList,
    fetchReadingList,
    gettingReadingList,
    readingList,
  } = useBookStore();
  const [bookState, SetBookState] = useState("Okunacak");

  useEffect(() => {
    fetchReadingList();
  }, []);

  return (
    <div className="mt-20 bg-[#FCFCFF]">
      <div className="p-4 gap-2 flex flex-col justify-center items-center h-96">
        <div className="flex flex-col justify-center items-center p-3 space-y-2">
          <h1
            className="
          
          font-light text-4xl tracking-wider
          "
          >
            Kitaplığın
          </h1>
          <p className="text-md">Tüm favori kitaplarını burada oku</p>
        </div>
        <div className="flex space-x-8 rounded-4xl bg-[#E8E1C6] justify-between items-center">
          <div
            onClick={() => SetBookState("Okunuyor")}
            className={`rounded-4xl  p-4 flex justify-center items-center cursor-pointer ${
              bookState == "Okunuyor" ? "bg-[#59461B]" : ""
            }`}
          >
            <p
              className={`text-xl mx-3 ${
                bookState == "Okunuyor" ? "text-white" : ""
              }`}
            >
              Okunuyor
            </p>
          </div>
          <div
            onClick={() => SetBookState("Okunacak")}
            className={`rounded-4xl cursor-pointer p-4 flex justify-center items-center ${
              bookState == "Okunacak" ? "bg-[#59461B]" : ""
            }`}
          >
            <p
              className={`text-xl mx-3 ${
                bookState == "Okunacak" ? "text-white" : ""
              }`}
            >
              Okunacak
            </p>
          </div>
          <div
            onClick={() => SetBookState("Okundu")}
            className={`rounded-4xl cursor-pointer p-4 flex justify-center items-center ${
              bookState == "Okundu" ? "bg-[#59461B]" : ""
            }`}
          >
            <p
              className={`text-xl mx-3 ${
                bookState == "Okundu" ? "text-white" : ""
              }`}
            >
              Okundu
            </p>
          </div>
        </div>
      </div>

      <div className="px-10">
        <table className="w-full border-separate border-spacing-y-4 table-fixed">
          <thead>
            <tr className="bg-[#E8E1C6] w-full h-8 text-[#7D6222]">
              <th></th>
              <th className="text-center">BAŞLIK & YAZAR</th>
              <th>PUAN</th>
              <th>EKLENME TARİHİ</th>
              <th>OKUMA TARİHİ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {gettingReadingList ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  <Loader className="w-10 h-10 animate-spin mx-auto text-gray-500" />
                </td>
              </tr>
            ) : readingList.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  Henüz okuma listen boş görünüyor.
                </td>
              </tr>
            ) : (
              readingList.map((book) => (
                <tr key={book.bookId} className="bg-[#F3ECD6]">
                  <td className="p-6">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <img
                        src={book.thumbnail}
                        alt=""
                        className="w-36 h-auto object-cover rounded shadow-2xl mb-2"
                      />
                      <button
                        className="border text-sm px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
                        onClick={() => deleteReadingList(book.bookId)}
                      >
                        Okuma Listesinden Çıkar
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col justify-center items-center gap-3">
                      <p className="text-[#565353]">{book.title}</p>
                      <p className="text-[#7D6222]">
                        {book.authors.join(", ")}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2 justify-center items-center">
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
                  </td>
                  <td className="text-center">{book.publishedDate}</td>
                  <td className="text-center">{book.publishedDate}</td>
                  <td>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <Link
                        to={`/kitaplar/${book.bookId}`}
                        className="flex flex-col items-center gap-1 text-blue-500 hover:underline"
                      >
                        <MessageSquareMore className="w-6 h-6" />
                        <p>İnceleme Yaz</p>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Library;
