import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useBookStore } from "../store/useBookStore";
import { useAuthStore } from "../store/useAuthStore";
import { Loader, MessageSquareMore, Star } from "lucide-react";

const Library = () => {
  // const { readingList, fetchReadingList } = useAuthStore();
  const { user } = useAuthStore();
  useEffect(() => {
    user;
  }, [user]);
  return (
    <div className="mt-19 bg-[#FCFCFF]">
      <div className=" p-4 gap-2 flex flex-col justify-center items-center  h-96">
        <div className="flex flex-col jystify-center items-center p-3 space-y-2">
          <h1 className="font-light text-4xl tracking-wider">Kitaplığın</h1>
          <p className="text-md">Tüm favori kitaplarını burada oku</p>
        </div>
        <div className="flex space-x-8 rounded-4xl bg-[#E8E1C6]  justify-between items-center">
          <div className="rounded-4xl bg-[#59461B] p-4 flex justify-center items-center">
            <p className="text-white text-xl mx-3">Okundu</p>
          </div>
          <div className="rounded-4xl  p-4 flex justify-center items-center">
            <p className="ext-white text-xl mx-3">Şu An Okunan</p>
          </div>
          <div className="rounded-4xl  p-4 flex justify-center items-center">
            <p className="ext-white text-xl mx-3">Okunacak</p>
          </div>
        </div>
      </div>
      <div className="px-10">
        <table className=" w-full border-separate border-spacing-y-4  table-fixed ">
          <tr className="bg-[#E8E1C6] w-full h-8 text-[#7D6222]">
            <th></th>
            <th className="text-center">BAŞLIK & YAZAR</th>
            <th>PUAN</th>
            <th>EKLENME TARİHİ</th>
            <th>OKUMA TARİHİ</th>
            <th></th>
          </tr>
          {user.readingList.map((book) => (
            <tr key={book.id} className="bg-[#F3ECD6]  m-3 ">
              <td className="p-6">
                <div>
                  {" "}
                  <img
                    src={book.thumbnail}
                    alt=""
                    className="w-36 h-auto m-4  object-cover rounded shadow-2xl"
                  />
                </div>
              </td>
              <td>
                <div className="flex flex-col justify-center items-center gap-3">
                  <p className="text-[#565353]">{book.title}</p>
                  <p className="text-[#7D6222]"> {book.authors.join(", ")}</p>
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
              <td>
                <div className="justify-center items-center flex">
                  {book.publishedDate}
                </div>
              </td>
              <td>
                <div className="justify-center items-center flex">
                  {book.publishedDate}
                </div>
              </td>
              <td>
                <div className="flex flex-col justify-center items-center gap-4">
                  <div>
                    <MessageSquareMore className="w-12 h-12" />
                  </div>
                  <div>
                    <p>İnceleme Yaz</p>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Library;
