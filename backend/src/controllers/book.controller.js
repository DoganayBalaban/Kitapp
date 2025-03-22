import axios from "axios";
import User from "../models/user.model.js";

export const searchBooks = async (req, res) => {
  const {
    q,
    startIndex = 0,
    maxResults = 10,
    lang = "tr",
    orderBy = "relevance",
  } = req.body;

  if (!q) {
    return res
      .status(400)
      .json({ message: "Arama terimi (q) belirtilmelidir." });
  }

  try {
    const response = await axios.get(process.env.GOOGLE_BOOKS_API_URL, {
      params: {
        q,
        startIndex,
        maxResults,
        langRestrict: lang,
        orderBy,
      },
    });

    const books = response.data.items.map((book) => ({
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      description: book.volumeInfo.description || "Açıklama bulunmuyor.",
      publishedDate: book.volumeInfo.publishedDate || "Bilinmiyor",
      pageCount: book.volumeInfo.pageCount || "Bilinmiyor",
      categories: book.volumeInfo.categories || [],
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || "",
    }));

    res.status(200).json({ books, totalItems: response.data.totalItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Kitaplar alınırken bir hata oluştu." });
  }
};
export const getBookDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${process.env.GOOGLE_BOOKS_API_URL}/${id}`
    );

    if (!response.data || !response.data.volumeInfo) {
      return res.status(404).json({ message: "Kitap bulunamadı." });
    }

    const book = {
      id: response.data.id || "Bilinmiyor",
      title: response.data.volumeInfo.title || "Bilinmiyor",
      authors: response.data.volumeInfo.authors || [],
      description:
        response.data.volumeInfo.description || "Açıklama bulunmuyor.",
      publishedDate: response.data.volumeInfo.publishedDate || "Bilinmiyor",
      pageCount: response.data.volumeInfo.pageCount || "Bilinmiyor",
      categories: response.data.volumeInfo.categories || [],
      thumbnail: response.data.volumeInfo.imageLinks?.thumbnail || "",
      rating: response.data.volumeInfo.averageRating || 0, // Kitabın ortalama puanı
      ratingsCount: response.data.volumeInfo.ratingsCount || 0, // Oylama sayısı
    };

    res.status(200).json(book);
  } catch (error) {
    console.error("Kitap detayı alınırken hata oluştu:", error);
    res
      .status(500)
      .json({ message: "Kitap detayı alınırken bir hata oluştu." });
  }
};
export const getFeaturedBooks = async (req, res) => {
  try {
    const response = await axios.get(process.env.GOOGLE_BOOKS_API_URL, {
      params: {
        q: "subject:fiction", // Burada 'fiction' yerine istediğin türü seçebilirsin
        maxResults: 40, // Daha fazla kitap çekelim ki sıralama yapabilelim
        langRestrict: "tr",
      },
    });

    if (!response.data.items) {
      return res
        .status(404)
        .json({ message: "Öne çıkan kitaplar bulunamadı." });
    }

    let books = response.data.items.map((book) => ({
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      description: book.volumeInfo.description || "Açıklama bulunmuyor.",
      publishedDate: book.volumeInfo.publishedDate || "Bilinmiyor",
      pageCount: book.volumeInfo.pageCount || "Bilinmiyor",
      categories: book.volumeInfo.categories || [],
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || "",
      rating: book.volumeInfo.averageRating || 0,
      ratingsCount: book.volumeInfo.ratingsCount || 0,
    }));

    // Oy sayısına göre azalan sırala
    books = books.sort((a, b) => b.ratingsCount - a.ratingsCount);

    // İlk 10 kitabı al
    books = books.slice(0, 10);

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Öne çıkan kitaplar alınırken hata oluştu." });
  }
};
export const addToReadingList = async (req, res) => {
  const {
    bookId,
    title,
    authors,
    description,
    publishedDate,
    pageCount,
    categories,
    thumbnail,
    rating,
  } = req.body;
  const userId = req.user?._id;

  try {
    if (!userId) {
      return res.status(400).json({ message: "Kullanıcı kimliği eksik." });
    }

    // Kullanıcıyı ve okuma listesini güncelle
    const user = await User.findOneAndUpdate(
      { _id: userId, "readingList.bookId": { $ne: bookId } }, // Eğer kitap yoksa ekle
      {
        $push: {
          readingList: {
            bookId,
            title,
            authors,
            description,
            publishedDate,
            pageCount,
            categories,
            thumbnail,
            rating,
          },
        },
      },
      { new: true } // Güncellenmiş kullanıcı verisini döndür
    );

    if (!user) {
      return res.status(400).json({ message: "Kitap zaten okuma listesinde." });
    }

    res.status(201).json({
      message: "Kitap okunma listesine eklendi.",
      readingList: user.readingList,
    });
  } catch (error) {
    console.error(
      "Kitap okunma listesine eklenirken hata oluştu:",
      error.message
    );
    res.status(500).json({
      message: "Kitap okunma listesine eklenirken bir hata oluştu.",
      error: error.message,
    });
  }
};
export const getReadingList = async (req, res) => {
  const userId = req.user._id; // Kullanıcı ID'si alınıyor

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    res.status(200).json(user.readingList || []); // Okuma listesini döndür (boş dizi fallback)
  } catch (error) {
    console.error("Okuma listesi getirilirken hata oluştu:", error.message);
    res.status(500).json({
      message: "Okuma listesi getirilirken bir hata oluştu.",
      error: error.message,
    });
  }
};
export const deleteReadingList = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı Bulunamadı." });
    }
    user.readingList = user.readingList.filter(
      (book) => book.bookId !== bookId
    );
    await User.findByIdAndUpdate(userId, {
      $pull: { readingList: { bookId } },
    });

    res.status(200).json({ message: "Kitap okuma listesinden silindi." });
  } catch (error) {
    console.error(
      "Okuma listesinden kitap silinirken hata oluştu:",
      error.message
    );
    res.status(500).json({
      message: "Okuma listesinden kitap silinirken bir hata oluştu.",
      error: error.message,
    });
  }
};
