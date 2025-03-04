import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookStore } from "../store/useBookStore";
import { Loader, Star } from "lucide-react";
import { usePostStore } from "../store/usePostStore";

const BookDetails = () => {
  const { id } = useParams();
  const { book, getBookById, isGettingBook, addToReadingList } = useBookStore();
  const { posts, isGettingPost, addPost } = usePostStore();
  const [data, setData] = useState({ title: "", content: "" });

  useEffect(() => {
    getBookById(id);
  }, [id]);

  if (isGettingBook) {
    return <Loader className="w-64 h-64 animate-spin" />;
  }

  if (!book) {
    return <div>Kitap bulunamadı</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.title.trim() && data.content.trim()) {
      addPost(id, data.title, data.content);
      setData({ title: "", content: "" });
    }
  };

  return (
    <div className="container mt-10 p-6">
      <div className="grid grid-cols-5 gap-4 p-4 my-5">
        <div className="col-span-2 flex flex-col items-center space-y-4">
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-68 rounded-lg shadow-lg"
          />
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
            className="mt-4"
          >
            Okuma Listeme Ekle
          </button>
        </div>
        <div className="col-span-3 p-4 text-start">
          <h1 className="text-4xl font-light">{book.title}</h1>
          <p className="text-xl text-gray-600">{book.authors?.join(", ")}</p>
          <p className="mt-5 text-sm font-light">
            Yayın Tarihi: {book.publishedDate}
          </p>
          <p
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: book.description }}
          ></p>
          <div className="mt-5">
            <h1 className="text-lg font-light">Türler:</h1>
            <p className="text-lg font-light">{book.categories?.join(", ")}</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-center text-2xl font-light">İncelemeler</h1>
        {posts.length > 0 ? (
          <div className="mt-5">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border p-4 rounded-lg shadow-md mb-4"
              >
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-5">Henüz inceleme yok.</p>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-light">İnceleme Yaz</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block font-medium">Başlık</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="border w-full p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium ">İçerik</label>
            <textarea
              value={data.content}
              onChange={(e) => setData({ ...data, content: e.target.value })}
              className="border "
            />
          </div>
          <button type="submit" className="bg-black text-white">
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookDetails;
