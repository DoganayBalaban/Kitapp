import React, { useState } from "react";
import { Heart } from "lucide-react"; // lucide-react'ten kalp ikonu alıyoruz

const HeartButton = ({ bookId, addToReadingList, removeFromReadingList }) => {
  // Başlangıçta favori değil
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromReadingList(bookId); // Favoriden çıkar
    } else {
      addToReadingList(bookId); // Favoriye ekle
    }
    setIsFavorite(!isFavorite); // Kalp rengini değiştir
  };

  return (
    <button onClick={handleFavoriteToggle} className="relative">
      <Heart
        size={24}
        className={`cursor-pointer ${
          isFavorite ? "text-red-500" : "text-gray-400"
        }`}
      />
    </button>
  );
};

export default HeartButton;
