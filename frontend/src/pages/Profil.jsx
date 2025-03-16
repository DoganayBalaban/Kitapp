import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Star, User } from "lucide-react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";
import { usePostStore } from "../store/usePostStore";

const Profil = () => {
  const { user, updateProfile, isUpdatingProfile } = useAuthStore();
  const { getPostByUser, posts } = usePostStore();
  const [selectedImg, setSelectedImg] = useState(null);
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
  useEffect(() => {
    if (user?._id) {
      getPostByUser(user._id);
    }
  }, [user]);

  return (
    <div className="mt-20 ">
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className=" relative">
            <img
              src={selectedImg || user?.avatar}
              alt=""
              className=" w-48 h-48 object-cover rounded-full hover:opacity-70"
            />
            <label
              htmlFor="avatar-upload"
              className={`
                absolute bottom-0 right-0 
                bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer 
                transition-all duration-200
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
              `}
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
      <div>
        <div className="m-2 p-2">
          <h1 className="text-3xl font-light">Şu Anda Okuyor</h1>
        </div>
        <div className="m-5">
          <Swiper spaceBetween={40} slidesPerView={5}>
            {user.readingList.map((book) => (
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
      </div>
      <div>
        <div className="m-2 p-2">
          <h1 className="text-3xl font-light">İncelemeler</h1>
        </div>
        <div>
          {posts.length > 0 ? (
            <div className="m-5 p-5 flex gap-4 ">
              <Swiper spaceBetween={40} slidesPerView={3}>
                {posts.map((post) => (
                  <div key={post.id} className=" p-4">
                    <SwiperSlide>
                      <div className=" gap-4 bg-[#F9F2DE] p-4">
                        {/* Başlık ve İçerik */}
                        <div className="col-span-4 p-3 m-3">
                          <div>
                            <h1 className="text-gray-700 font-semibold text-xl ">
                              {post.title}
                            </h1>
                          </div>
                          <div className="col-span-4 p-4 m-4">
                            <p className="text-gray-700">{post.content}</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </div>
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
