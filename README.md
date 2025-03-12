# Kitap Platformu

Kitap Platformu, kullanıcıların kitap keşfetmesini, kitaplar hakkında yorum yapmasını, okuma listeleri oluşturmasını ve yapay zeka destekli öneriler almasını sağlayan interaktif bir web uygulamasıdır. Kullanıcılar birbirlerini takip edebilir, okuma listeleri oluşturabilir ve diğer kullanıcıların kitap incelemelerini görüntüleyebilirler.

## 🚀 Özellikler
- Kullanıcı kaydı ve girişi (JWT Authentication)
- Kullanıcı profili düzenleme (Avatar yükleme, bilgiler güncelleme)
- Kitap listeleri oluşturma (Okuma listesi, favoriler vb.)
- Kitap arama ve öne çıkan kitapları görüntüleme
- Kitaplara inceleme (post) ekleme, düzenleme ve silme
- Kullanıcıları takip etme ve takipçileri görüntüleme
- Yapay zeka destekli kitap önerileri alma
- Kullanıcı profillerini ziyaret etme ve diğer kullanıcıların okuma listelerine göz atma

## 🛠️ Kullanılan Teknolojiler
- **Frontend:** React, Zustand, TailwindCSS, Swiper.js
- **Backend:** Node.js, Express.js, MongoDB, JWT Authentication
- **Diğer:** Axios, React Router, Yapay Zeka Öneri Motoru

## 📂 Proje Yapısı
```
📦 proje-dizini
 ┣ 📂 backend
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┣ 📂 middleware
 ┃ ┗ server.js
 ┣ 📂 frontend
 ┃ ┣ 📂 components
 ┃ ┣ 📂 pages
 ┃ ┣ 📂 store
 ┃ ┣ 📂 lib
 ┃ ┗ App.js
 ┣ 📜 README.md
 ┗ 📜 package.json
```

## 🏗️ Kurulum
### 1. Depoyu Klonla
```sh
git clone https://github.com/DoganayBalaban/Kitapp
cd proje-adi
```
### 2. Backend Kurulumu
```sh
cd backend
npm install
npm start
```
Backend varsayılan olarak `http://localhost:5000` üzerinde çalışacaktır.

### 3. Frontend Kurulumu
```sh
cd ../frontend
npm install
npm start
```
Frontend varsayılan olarak `http://localhost:3000` üzerinde çalışacaktır.

## 🌍 API Endpointleri
| Yöntem | Endpoint | Açıklama |
|--------|---------|----------|
| `POST` | `/auth/signup` | Kullanıcı kaydı |
| `POST` | `/auth/login` | Kullanıcı girişi |
| `POST` | `/auth/logout` | Kullanıcı çıkışı |
| `PUT` | `/auth/update-profile` | Kullanıcı güncelleme |
| `GET` | `/auth/me` | Kullanıcı kontrolü |
| `POST` | `/book/search` | Kitap arama |
| `GET` | `/book/featured` | Öne çıkan kitapları getir |
| `GET` | `/book/:id` | Belirli bir kitabın detaylarını getir |
| `POST` | `/book/addList` | Kitap listesine ekleme |
| `GET` | `/book/reading-list` | Kullanıcının okuma listesini getir |
| `POST` | `/friends/follow/:userId` | Kullanıcıyı takip et |
| `POST` | `/friends/unfollow/:userId` | Kullanıcıyı takipten çık |
| `GET` | `/friends/following` | Kullanıcının takip ettiklerini getir |
| `GET` | `/friends/followers` | Kullanıcının takipçilerini getir |
| `GET` | `/ai/recommend` | Yapay zeka ile kitap önerisi al |
| `GET`  | `/posts/book/:bookId` | Belirli bir kitabın incelemeleri |
| `GET`  | `/posts/user/:userId` | Kullanıcının yaptığı incelemeler |
| `POST` | `/posts/create` | Yeni inceleme oluştur |
| `PUT`  | `/posts/:id` | İncelemeyi güncelle |
| `DELETE` | `/posts/:id` | İncelemeyi sil |

## 📝 Katkıda Bulunma
Projeye katkıda bulunmak için bir `fork` oluşturup, geliştirmelerinizi `pull request` olarak gönderebilirsiniz. 🎉

---

📌 **Not:** Ortam değişkenlerini `.env` dosyasında belirtmeyi unutmayın:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

