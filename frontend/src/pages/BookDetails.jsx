import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookStore } from "../store/useBookStore";
import { Loader, Star, User } from "lucide-react";
import { usePostStore } from "../store/usePostStore";

const BookDetails = () => {
  const { id } = useParams();
  const { book, getBookById, isGettingBook, addToReadingList } = useBookStore();
  const { posts, isGettingPost, createPost, getPostByBook } = usePostStore();

  const [data, setData] = useState({ title: "", content: "" });
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    getBookById(id);
    getPostByBook(id);
  }, [id]);

  if (isGettingBook) {
    return (
      <div className="flex items-center justify-center w-64 h-64">
        <Loader className="w-64 h-64 animate-spin" />
      </div>
    );
  }

  if (!book) {
    return <div>Kitap bulunamadı</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.title.trim() && data.content.trim()) {
      const postData = {
        bookId: id,
        title: data.title,
        content: data.content,
      };
      createPost(postData);
      setData({ title: "", content: "" });
    }
  };

  const visiblePosts = showAllReviews ? posts : posts.slice(0, 2);

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

      {/* İncelemeler */}
      <div className="mt-10">
        <h1 className="text-center text-2xl font-light">İncelemeler</h1>
        {visiblePosts.length > 0 ? (
          <div className="mt-5 flex flex-col gap-4">
            {visiblePosts.map((post) => (
              <div key={post.id} className="p-4">
                <div className="grid grid-cols-5 gap-4 bg-[#F9F2DE] p-4">
                  <div className="col-span-1 flex flex-col justify-center items-center gap-4">
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <h2 className="text-xl">{post.user?.name || "Anonim"}</h2>
                    <p className="flex items-center text-sm">
                      <User className="mr-1" />
                      {post.user.followers?.length || 0} Takipçi
                    </p>
                    <button className="bg-[#E4B568] px-4 py-2 font-semibold rounded">
                      Follow
                    </button>
                  </div>

                  <div className="col-span-4 p-3 m-3">
                    <h1 className="text-gray-700 font-semibold text-xl">
                      {post.title}
                    </h1>
                    <p className="text-gray-700 mt-4">{post.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Daha fazla göster / Daha az göster butonu */}
            {posts.length > 2 && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="bg-[#E4B568] px-6 py-2 font-semibold rounded hover:bg-[#d3a656] transition"
                >
                  {showAllReviews ? "Daha az göster" : "Daha fazla göster"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-5">Henüz inceleme yok.</p>
        )}
      </div>

      {/* İnceleme Yazma Formu */}
      <div className="mt-10 flex flex-col items-center">
        <h2 className="text-2xl font-light mb-6">İnceleme Yaz</h2>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Başlık
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Başlık giriniz..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Metin
            </label>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              value={data.content}
              onChange={(e) => setData({ ...data, content: e.target.value })}
              placeholder="İncelemenizi buraya yazınız..."
            />
          </div>
          <button className="w-full bg-black text-white p-3 rounded-md font-semibold hover:bg-gray-900 transition">
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookDetails;
