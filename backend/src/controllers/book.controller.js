import axios from "axios";

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

    const book = {
      id: response.data.id,
      title: response.data.volumeInfo.title,
      authors: response.data.volumeInfo.authors || [],
      description:
        response.data.volumeInfo.description || "Açıklama bulunmuyor.",
      publishedDate: response.data.volumeInfo.publishedDate || "Bilinmiyor",
      pageCount: response.data.volumeInfo.pageCount || "Bilinmiyor",
      categories: response.data.volumeInfo.categories || [],
      thumbnail: response.data.volumeInfo.imageLinks?.thumbnail || "",
    };

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Kitap detayı alınırken bir hata oluştu." });
  }
};
