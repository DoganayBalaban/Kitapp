import React from "react";

const Post = () => {
  const { posts, isGettingPost, createPos, getPostByBook } = usePostStore();
  return (
    <div>
      {posts.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border p-4 rounded-lg shadow-md w-full"
            >
              <div className="grid grid-cols-5 gap-4">
                {/* Kullanıcı Avatarı ve İsmi */}
                <div className="col-span-1 flex flex-col justify-center items-center">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-12 h-12 rounded-full"
                  />

                  <h2 className="text-sm font-medium">
                    {post.user?.name || "Anonim"}
                  </h2>
                </div>

                {/* Başlık ve İçerik */}
                <div className="col-span-4">
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <p className="text-gray-700">{post.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-5">Henüz inceleme yok.</p>
      )}
    </div>
  );
};

export default Post;
