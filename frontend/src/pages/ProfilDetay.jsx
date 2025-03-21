import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

const ProfilDetay = () => {
  const { id } = useParams();

  const { user, userProfile, fetchUserProfile, isLoading } = useAuthStore();

  useEffect(() => {
    fetchUserProfile(id);
  }, [id]);

  if (isLoading || !userProfile)
    return <div className="mt-24 p-4">Yükleniyor...</div>;

  const isFollowing = user?.following?.includes(userProfile._id);

  return (
    <div className="mt-24 p-4 text-center">
      <img
        src={userProfile.avatar}
        alt={userProfile.name}
        className="w-32 h-32 rounded-full mx-auto"
      />
      <h1 className="text-2xl font-semibold mt-4">{userProfile.name}</h1>

      {user && user._id !== userProfile._id && (
        <button
          onClick={() =>
            isFollowing
              ? unfollowUser(userProfile._id)
              : followUser(userProfile._id)
          }
          className={`mt-4 px-6 py-2 rounded ${
            isFollowing ? "bg-red-500" : "bg-blue-500"
          } text-white`}
        >
          {isFollowing ? "Takipten Çık" : "Takip Et"}
        </button>
      )}
    </div>
  );
};

export default ProfilDetay;
