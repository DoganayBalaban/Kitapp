import React from "react";
import { useRecommendationStore } from "../store/useRecommendationStore";

const Neokusam = () => {
  const {
    likedBooks,
    dislikedBooks,
    recommendations,
    loading,
    setLikedBooks,
    setDislikedBooks,
    getRecommendations,
  } = useRecommendationStore();

  return (
    <div className="p-4 mt-20 h-screen">
      <h2 className="text-lg font-bold">Ne Okusam?</h2>
      <input
        type="text"
        placeholder="Sevdiğin kitapları gir (virgülle ayır)"
        value={likedBooks}
        onChange={(e) => setLikedBooks(e.target.value)}
        className="block w-full p-2 border mt-2"
      />
      <input
        type="text"
        placeholder="Sevmediğin kitapları gir (virgülle ayır)"
        value={dislikedBooks}
        onChange={(e) => setDislikedBooks(e.target.value)}
        className="block w-full p-2 border mt-2"
      />
      <button
        onClick={getRecommendations}
        className="mt-3 bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Yükleniyor..." : "Öneri Al"}
      </button>
      {recommendations.length > 0 && (
        <div className="mt-4 p-3 border rounded">
          <h3 className="font-semibold">Önerilen Kitaplar:</h3>
          <ul className="flex flex-col gap-2 m-2 p-2">
            {" "}
            {/* flex-col sayesinde dikey sıralanır */}
            {recommendations.map((book, index) => (
              <li key={index} className="font-light text-2xl list-disc ml-4">
                {book}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Neokusam;
