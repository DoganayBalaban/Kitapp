import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBookStore } from "../store/useBookStore";
import { Loader, Star } from "lucide-react";

const BookDetails = () => {
  const { id } = useParams();
  const { book, getBookById, isGettingBook, addToReadingList } = useBookStore();

  useEffect(() => {
    getBookById(id);
  }, [id]);

  if (isGettingBook) {
    return <Loader className="w-64 h-64 animate-spin"></Loader>;
  }

  if (!book) {
    return <div>Kitap bulunamadı</div>;
  }

  return (
    <div className="container mt-19 p-6">
      <div className="grid grid-cols-5 gap-4 p-4 my-5">
        <div className="p-4 col-span-2 justify-center items-center flex flex-col space-y-3">
          <div>
            <img
              src={book.thumbnail}
              alt={book.title}
              className="w-68 rounded-lg shadow-[30px_30px_60px_rgba(0,0,0,0.3)]"
            />
          </div>
          <div className="flex items-center justify-center p-4 my-3 space-x-3">
            <p className="text-md font-light">Okunan Sayfa</p>
            <p className="text-md font-light">0/{book.pageCount}</p>
          </div>
          <div className="flex flex-col justify-center items-center p-2 gap-2">
            <p className="text-3xl font-light">{book.title}</p>
            <div className="flex gap-2">
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
            <div>
              <button
                onClick={() =>
                  addToReadingList({
                    bookId: book.id,
                    title: book.title,
                    authors: book.authors || [],
                    description: book.description || "",
                    publishedDate: book.publishedDate,
                    pageCount: book.pageCount,
                    categories: book.categories || [],
                    thumbnail: book.thumbnail,
                    rating: book.rating,
                  })
                }
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Okuma Listeme Ekle
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-3 p-4 text-start">
          <div>
            <h1 className="text-4xl font-light">{book.title}</h1>
            <p className="text-xl text-gray-600">{book.authors.join(", ")}</p>
            <p className="mt-5 text-sm font-light">
              Yayın Tarihi -- {book.publishedDate}
            </p>
          </div>
          <p
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: book.description }}
          ></p>
          <div className="mt-5 flex items-start">
            <h1 className="text-lg font-light">TÜRLER:</h1>
            <p className="font-ligh text-lg mx-4 font-light">
              {book.categories}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
