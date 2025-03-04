import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const recommendBooks = async (req, res) => {
  try {
    const { likedBooks, dislikedBooks } = req.body;

    const prompt = `
    Bir kullanıcı kitap önerisi istiyor. 
    Kullanıcının sevdiği kitaplar: ${likedBooks.join(", ")}. 
    Kullanıcının sevmediği kitaplar: ${dislikedBooks.join(", ")}. 
    Bu bilgilere dayanarak, 10 tane kitap öner. 
    **Sadece kitap isimlerini ver**, açıklama yapma.  
    **Cevabı Türkçe olarak ver.**
  `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Kitap isimlerini düzgün almak için satır satır ayır
    const bookNames = text
      .split("\n")
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .filter((name) => name.length > 0);

    const booksWithDetails = await Promise.all(
      bookNames.map(async (bookName) => {
        const googleBooksURL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          bookName
        )}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

        try {
          const response = await axios.get(googleBooksURL);
          const bookData = response.data.items?.[0]?.volumeInfo;

          return {
            id: response.data.items?.[0]?.id || null,
            title: bookData?.title || bookName,
            author: bookData?.authors?.join(", ") || "Bilinmeyen Yazar",
            thumbnail: bookData?.imageLinks?.thumbnail || null,
            rating: bookData?.averageRating || 0,
          };
        } catch (error) {
          console.error(`Google Books API Hatası: ${error}`);
          return { title: bookName, author: "Bilinmiyor", thumbnail: null };
        }
      })
    );

    res.json({ books: booksWithDetails });
  } catch (error) {
    console.error("Kitap önerisi alınırken hata oluştu:", error);
    res.status(500).json({ error: "Kitap önerisi alınırken hata oluştu." });
  }
};
