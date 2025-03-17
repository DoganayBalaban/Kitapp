import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, NotebookPen, Star, Trash, X, Save } from "lucide-react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";
import { usePostStore } from "../store/usePostStore";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

const Profil = () => {
  const { user, updateProfile, isUpdatingProfile } = useAuthStore();
  const { getPostByUser, posts, deletePost, updatePost } = usePostStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null); // Düzenlenen post'un ID'si
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;
      setSelectedImg(base64);
      await updateProfile({ avatar: base64 });
    };
  };

  const handleDelete = (postid) => async (e) => {
    e.preventDefault();
    await deletePost(postid);
  };

  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleUpdate = async (postid) => {
    await updatePost(postid, {
      title: editedTitle,
      content: editedContent,
    });
    setEditingPostId(null); // Düzenleme modundan çık
  };

  useEffect(() => {
    if (user?._id) {
      getPostByUser(user._id);
    }
  }, [user]);

  return (
    <div className="mt-20">
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="relative">
            <img
              src={selectedImg || user?.avatar}
              alt=""
              className="w-48 h-48 object-cover rounded-full hover:opacity-70"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <div>
            <h1 className="text-3xl font-light">{user?.name}</h1>
          </div>
        </div>
      </div>

      {/* Şu Anda Okuyor */}
      <div>
        <div className="m-2 p-2">
          <h1 className="text-3xl font-light">Şu Anda Okuyor</h1>
        </div>
        <div className="m-5">
          <Swiper
            spaceBetween={40}
            slidesPerView={1} // Default olarak 1 slayt göster
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {user.readingList.map((book) => (
              <SwiperSlide key={book.bookId} className="p-4">
                <Link
                  to={`/kitaplar/${book.id}`}
                  className="flex flex-col items-center justify-center"
                >
                  {/* Thumbnail - Görsel */}
                  <div className="flex justify-center w-full">
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="max-w-[180px] max-h-[260px] w-auto h-auto object-cover rounded shadow-lg
                       sm:max-w-[140px] sm:max-h-[220px] 
                       md:max-w-[160px] md:max-h-[240px]"
                    />
                  </div>

                  {/* Kitap Bilgileri */}
                  <div className="text-center mt-3 w-full">
                    <h3 className="font-semibold text-lg md:text-xl">
                      {book.title}
                    </h3>
                    <p className="text-sm font-light">
                      {book.authors.join(", ")}
                    </p>
                    <div className="flex justify-center gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={`${book.id}-star-${index}`}
                          className={
                            index < book.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-400"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* İncelemeler */}
      <div>
        <div className="m-2 p-2">
          <h1 className="text-3xl font-light">İncelemeler</h1>
        </div>
        <div>
          {posts.length > 0 ? (
            <div className="m-5 p-5 flex gap-4">
              <Swiper
                spaceBetween={40}
                slidesPerView={1}
                modules={[Scrollbar]}
                scrollbar={{ draggable: true }}
                breakpoints={{
                  640: { slidesPerView: 1 }, // 640px'den büyük ekranlarda 2 slayt göster
                  768: { slidesPerView: 2 }, // 768px'den büyük ekranlarda 3 slayt göster
                  1024: { slidesPerView: 3 }, // 1024px'den büyük ekranlarda 4 slayt göster
                  1280: { slidesPerView: 3 }, // 1280px'den büyük ekranlarda 5 slayt göster
                }}
              >
                {posts.map((post) => (
                  <SwiperSlide key={post._id} className="p-4">
                    <div className="gap-4 bg-[#F9F2DE] p-4">
                      {/* Delete ve Update */}
                      <div className="col-span-4 p-3 m-3">
                        <div className="flex items-center justify-end space-x-3">
                          {/* Güncelleme Moduna Geçiş */}
                          {editingPostId === post._id ? (
                            <button
                              className="text-gray-500"
                              onClick={() => setEditingPostId(null)}
                            >
                              <X size={18} />
                            </button>
                          ) : (
                            <button
                              className="text-blue-500"
                              onClick={() => handleEdit(post)}
                            >
                              <NotebookPen size={18} />
                            </button>
                          )}

                          {/* Silme Butonu */}
                          <button
                            className="text-red-500"
                            onClick={handleDelete(post._id)}
                          >
                            <Trash size={18} />
                          </button>
                        </div>

                        {/* Başlık ve İçerik */}
                        {editingPostId === post._id ? (
                          <>
                            <input
                              type="text"
                              className="w-full text-lg font-semibold border-b border p-2"
                              value={editedTitle}
                              onChange={(e) => setEditedTitle(e.target.value)}
                            />
                            <textarea
                              className="w-full h-24  border p-2 mt-2"
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                            />
                            <button
                              onClick={() => handleUpdate(post._id)}
                              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Güncelle{" "}
                              <Save size={16} className="inline-block ml-1" />
                            </button>
                          </>
                        ) : (
                          <>
                            <h1 className="text-gray-700 font-semibold text-xl">
                              {post.title}
                            </h1>
                            <p className="text-gray-700 mt-2">{post.content}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-5">
              Henüz inceleme yok.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profil;
