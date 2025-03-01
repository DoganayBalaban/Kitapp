import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const recommendBooks = async (req, res) => {
  try {
    const { likedBooks, dislikedBooks } = req.body;

    const prompt = `
    Bir kullanıcı kitap önerisi istiyor. 
    Kullanıcının sevdiği kitaplar: ${likedBooks.join(", ")}. 
    Kullanıcının sevmediği kitaplar: ${dislikedBooks.join(", ")}. 
    Bu bilgilere dayanarak, 3 tane kitap öner. 
    **Sadece kitap isimlerini ver**, açıklama yapma.  
    **Cevabı Türkçe olarak ver.**
  `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Kitap isimlerini düzgün almak için satır satır ayır
    const bookList = text
      .split("\n")
      .map((line) => line.replace(/^\d+\.\s*/, "").trim());

    res.json({ recommendations: bookList });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
};
