import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { usePostStore } from "../store/usePostStore";
import { Camera, NotebookPen, Star, Trash, X, Save } from "lucide-react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

const Profil = () => {
  const { id } = useParams();
  const isOwnProfile = !id;

  const {
    user,
    updateProfile,
    isUpdatingProfile,
    userProfile,
    fetchUserProfile,
    followUser,
    unfollowUser,
  } = useAuthStore();

  const { getPostByUser, posts, deletePost, updatePost } = usePostStore();

  const profileData = isOwnProfile ? user : userProfile;

  const [selectedImg, setSelectedImg] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
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
    setEditingPostId(null);
  };

  const isFollowing = user?.following?.includes(userProfile?._id);

  useEffect(() => {
    if (!isOwnProfile && id) {
      fetchUserProfile(id);
    }
  }, [id]);

  useEffect(() => {
    const targetId = isOwnProfile ? user?._id : id;
    if (targetId) {
      getPostByUser(targetId);
    }
  }, [user, id]);

  if (!profileData) {
    return <div className="mt-24 text-center">Yükleniyor...</div>;
  }

  // Kullanıcının kendi postu olup olmadığını güvenle kontrol eden helper
  const isPostOwner = (postUser, userId) => {
    if (!postUser || !userId) return false;
    return typeof postUser === "string"
      ? postUser === userId
      : postUser._id === userId;
  };

  return (
    <div className="mt-20">
      {/* Profil Foto ve İsim */}
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="relative">
            <img
              src={selectedImg || profileData.avatar}
              alt="avatar"
              className="w-48 h-48 object-cover rounded-full "
            />
            {isOwnProfile && (
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
            )}
          </div>
          <h1 className="text-3xl font-light">{profileData.name}</h1>

          {!isOwnProfile && user && user._id !== userProfile?._id && (
            <button
              onClick={() =>
                isFollowing
                  ? unfollowUser(userProfile._id)
                  : followUser(userProfile._id)
              }
              className="mt-2 px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
            >
              {isFollowing ? "Takipten Çık" : "Takip Et"}
            </button>
          )}
        </div>
      </div>

      {/* Okuma Listesi */}
      <div>
        <div className="m-2 p-2">
          <h1 className="text-3xl font-light">Şu Anda Okuyor</h1>
        </div>
        <div className="m-5">
          {profileData.readingList?.length >= 1 ? (
            <Swiper
              spaceBetween={40}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
            >
              {profileData.readingList.map((book) => (
                <SwiperSlide key={book.bookId} className="p-4">
                  <Link
                    to={`/kitaplar/${book.id}`}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="max-w-[180px] max-h-[260px] object-cover rounded shadow-lg"
                    />
                    <h3 className="font-semibold text-lg mt-2">{book.title}</h3>
                    <p className="text-sm text-gray-600">
                      {book.authors.join(", ")}
                    </p>
                    <div className="flex justify-center gap-1 mt-1">
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
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-gray-500">
              Henüz okuma listesi boş.
            </p>
          )}
        </div>
      </div>

      {/* İncelemeler */}
      <div>
        <div className="m-2 p-2">
          <h1 className="text-3xl font-light">İncelemeler</h1>
        </div>
        <div className="m-5 p-5">
          {posts.length >= 3 ? (
            <Swiper
              spaceBetween={40}
              slidesPerView={1}
              modules={[Scrollbar]}
              scrollbar={{ draggable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {posts.map((post) => (
                <SwiperSlide key={post._id} className="p-4">
                  <PostCard
                    post={post}
                    isOwn={isOwnProfile && isPostOwner(post.user, user?._id)}
                    editingPostId={editingPostId}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    editedTitle={editedTitle}
                    setEditedTitle={setEditedTitle}
                    editedContent={editedContent}
                    setEditedContent={setEditedContent}
                    setEditingPostId={setEditingPostId}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                isOwn={isOwnProfile && isPostOwner(post.user, user?._id)}
                editingPostId={editingPostId}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                editedTitle={editedTitle}
                setEditedTitle={setEditedTitle}
                editedContent={editedContent}
                setEditedContent={setEditedContent}
                setEditingPostId={setEditingPostId}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Henüz inceleme yok.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const PostCard = ({
  post,
  isOwn,
  editingPostId,
  handleEdit,
  handleDelete,
  handleUpdate,
  editedTitle,
  setEditedTitle,
  editedContent,
  setEditedContent,
  setEditingPostId,
}) => {
  const isEditing = editingPostId === post._id;

  return (
    <div className="bg-[#F9F2DE] p-4 rounded shadow mb-6">
      {isOwn && (
        <div className="flex items-center justify-end space-x-3">
          {isEditing ? (
            <button
              onClick={() => setEditingPostId(null)}
              className="text-gray-500"
            >
              <X size={18} />
            </button>
          ) : (
            <button onClick={() => handleEdit(post)} className="text-blue-500">
              <NotebookPen size={18} />
            </button>
          )}
          <button onClick={handleDelete(post._id)} className="text-red-500">
            <Trash size={18} />
          </button>
        </div>
      )}

      {isEditing && isOwn ? (
        <>
          <input
            type="text"
            className="w-full text-lg font-semibold border-b border p-2"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="w-full h-24 border p-2 mt-2"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button
            onClick={() => handleUpdate(post._id)}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Güncelle <Save size={16} className="inline-block ml-1" />
          </button>
        </>
      ) : (
        <>
          <h1 className="text-gray-700 font-semibold text-xl">{post.title}</h1>
          <p className="text-gray-700 mt-2">{post.content}</p>
        </>
      )}
    </div>
  );
};

export default Profil;
