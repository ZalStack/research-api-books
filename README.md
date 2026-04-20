# 📚 Books API - Firebase Firestore + Node.js Express

---

## 🎯 Pendahuluan

Project ini adalah RESTful API untuk manajemen data buku yang dibangun dengan:

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web untuk Node.js
- **Firebase Firestore** - Database NoSQL dari Google
- **Firebase Admin SDK** - Untuk koneksi backend ke Firestore

### Fitur yang Tersedia:

| Fitur | Method | Endpoint |
|-------|--------|----------|
| Mendapatkan semua buku | GET | `/api/books` |
| Mendapatkan buku by ID | GET | `/api/books/:id` |
| Menambah buku baru | POST | `/api/books` |
| Mengupdate buku | PUT | `/api/books/:id` |
| Menghapus buku | DELETE | `/api/books/:id` |
| Filter & Sorting | GET | `/api/books/filter` |

### Filter & Sorting yang Didukung:

- **Filter**: genre, minHarga, maxHarga, minRating
- **Sorting**: harga, rating, judul
- **Order**: asc (ascending), desc (descending)

---

## 📌 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

| Software | Versi Minimal | Link Download |
|----------|---------------|---------------|
| Node.js | v16+ | [nodejs.org](https://nodejs.org/) |
| npm | v8+ | (termasuk Node.js) |
| Git | Latest | [git-scm.com](https://git-scm.com/) |
| Postman / Thunder Client | Latest | [postman.com](https://www.postman.com/) |

### Verifikasi Instalasi:
```bash
node --version   
npm --version    
git --version    
```

---

## 🔥 Setup Database Firebase

### Langkah 1: Buat Project Firebase Baru

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik **"Add project"** atau **"Buat project"**
3. Masukkan nama project (contoh: `books-api-project`)
4. Klik **"Continue"**
5. **Nonaktifkan** Google Analytics (kecuali Anda membutuhkannya)
6. Klik **"Create project"**
7. Tunggu hingga project selesai dibuat, lalu klik **"Continue"**

### Langkah 2: Buat Firestore Database

1. Di sidebar kiri, klik **"Firestore Database"**
2. Klik tombol **"Create database"**
3. Pilih **"Start in test mode"** (untuk development)
   ```
   ⚠️ Pilih TEST MODE untuk memudahkan development
   Nanti bisa diubah ke production mode setelah selesai
   ```
4. Pilih lokasi database (pilih yang terdekat, misal: `asia-southeast2` untuk Jakarta)
5. Klik **"Enable"**

### Langkah 3: Buat Collection `books`

Setelah database dibuat, Anda akan melihat halaman Firestore:

1. Klik **"Start collection"**
2. **Collection ID**: `books`
3. **Document ID**: Pilih **"Auto-ID"** (biarkan kosong)
4. Klik **"Next"**

### Langkah 4: Tambahkan Field untuk Document

Tambahkan field berikut satu per satu dengan mengklik **"Add field"**:

| Field Name | Type | Contoh Value |
|------------|------|--------------|
| `judul` | string | `Belajar Node.js Dasar` |
| `penulis` | string | `Andi Wijaya` |
| `genre` | string | `Programming` |
| `harga` | number | `150000` |
| `rating` | number | `4.8` |
| `stock` | number | `10` |
| `deskripsi` | string | `Buku panduan lengkap Node.js` |
| `gambarUrl` | string | `https://example.com/cover.jpg` |
| `penerbit` | string | `Gramedia` |
| `tahunTerbit` | number | `2025` |
| `createdAt` | timestamp | (centang Auto) |

> **Tips untuk field gambarUrl**:  
> Gunakan placeholder sementara: `https://placehold.co/400x600?text=Book+Cover`

Setelah selesai, klik **"Save"**

### Langkah 5: Download Service Account Key

Ini adalah langkah **PENTING** untuk menghubungkan Node.js dengan Firebase:

1. Di Firebase Console, klik **⚙️ Settings** (gear icon) di samping "Project Overview"
2. Pilih tab **"Service accounts"**
3. Di bagian **"Firebase Admin SDK"**, pilih **"Node.js"**
4. Klik tombol **"Generate new private key"**
5. File JSON akan otomatis terdownload
6. **Rename file tersebut** menjadi `serviceAccountKey.json`
7. **Simpan file ini dengan aman** - jangan pernah commit ke GitHub!

> ⚠️ **Peringatan Keamanan**:  
> `serviceAccountKey.json` berisi kredensial akses ke database, Jangan pernah membagikan file ini atau menguploadnya ke repository publik!

---

## 🚀 Setup Project Node.js

### Langkah 1: Buat Folder Project

```bash
mkdir books-api-firebase
cd books-api-firebase
```

### Langkah 2: Inisialisasi npm

```bash
npm init -y
```

Perintah di atas akan membuat file `package.json` dengan konfigurasi default.

### Langkah 3: Install Dependencies

```bash
npm install express firebase-admin dotenv cors
npm install -D nodemon
```

**Penjelasan dependencies:**

| Package | Fungsi |
|---------|--------|
| `express` | Framework web untuk membuat API |
| `firebase-admin` | SDK untuk koneksi backend ke Firebase |
| `dotenv` | Mengelola environment variables |
| `cors` | Mengizinkan akses dari domain berbeda |
| `nodemon` | Auto-restart server saat ada perubahan (dev dependency) |

### Langkah 4: Letakkan Service Account Key

Pindahkan file `serviceAccountKey.json` yang sudah didownload ke **root folder project** (`books-api-firebase/`)

### Langkah 5: Buat Folder Structure

```bash
mkdir config controllers services routes middleware
```

Struktur folder yang dihasilkan:
```
books-api-firebase/
├── config/
├── controllers/
├── services/
├── routes/
├── middleware/
├── serviceAccountKey.json
└── package.json
```

---

## 📁 Struktur Project Lengkap

```
books-api-firebase/
│
├── config/
│   └── firebase.js          # Konfigurasi koneksi Firebase
│
├── controllers/
│   └── bookController.js    # Handler untuk setiap request
│
├── services/
│   └── bookService.js       # Logika bisnis & operasi database
│
├── routes/
│   └── bookRoutes.js        # Definisi endpoint API
│
├── middleware/
│   └── errorHandler.js      # Handler error global
│
├── .env                     # Environment variables
├── .gitignore               # File yang tidak di-commit ke Git
├── package.json             # Dependencies dan scripts
├── server.js                # Entry point aplikasi
└── serviceAccountKey.json   # Kredensial Firebase (JANGAN DI-COMMIT)
```

## ▶️ Menjalankan Server

### Development Mode (dengan auto-restart):

```bash
npm run dev
```

Output yang diharapkan:
```
🚀 Server running on http://localhost:3000
📚 Books API ready at http://localhost:3000/api/books
```

### Production Mode:

```bash
npm start
```

### Verifikasi Server Berjalan:

Buka browser atau terminal, akses:
```bash
curl http://localhost:3000
```

Response yang diharapkan:
```json
{
  "name": "Books API",
  "version": "1.0.0",
  "description": "RESTful API untuk manajemen data buku",
  "endpoints": {
    "GET /api/books": "Get all books",
    "GET /api/books/:id": "Get book by ID",
    "POST /api/books": "Create new book",
    "PUT /api/books/:id": "Update book",
    "DELETE /api/books/:id": "Delete book",
    "GET /api/books/filter?genre=&minHarga=&maxHarga=&minRating=&sortBy=&order=": "Filter and sort books"
  }
}
```

---

## 🧪 Testing API

### Menggunakan cURL (Terminal)

#### 1. GET - Ambil semua buku
```bash
curl http://localhost:3000/api/books
```

#### 2. GET - Ambil buku by ID
```bash
curl http://localhost:3000/api/books/YOUR_BOOK_ID
```

#### 3. POST - Tambah buku baru
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "judul": "Pemrograman JavaScript Lanjutan",
    "penulis": "Budi Santoso",
    "genre": "Programming",
    "harga": 200000,
    "rating": 4.9,
    "stock": 15,
    "deskripsi": "Buku lanjutan tentang JavaScript",
    "penerbit": "Elex Media",
    "tahunTerbit": 2025
  }'
```

#### 4. PUT - Update buku
```bash
curl -X PUT http://localhost:3000/api/books/YOUR_BOOK_ID \
  -H "Content-Type: application/json" \
  -d '{
    "harga": 175000,
    "rating": 4.95,
    "stock": 12
  }'
```

#### 5. DELETE - Hapus buku
```bash
curl -X DELETE http://localhost:3000/api/books/YOUR_BOOK_ID
```

#### 6. Filter & Sorting Examples

```bash
# Filter berdasarkan genre
curl "http://localhost:3000/api/books/filter?genre=Programming"

# Filter harga 50rb - 200rb
curl "http://localhost:3000/api/books/filter?minHarga=50000&maxHarga=200000"

# Filter rating minimal 4.5
curl "http://localhost:3000/api/books/filter?minRating=4.5"

# Sorting harga termurah ke termahal
curl "http://localhost:3000/api/books/filter?sortBy=harga&order=asc"

# Sorting rating tertinggi ke terendah
curl "http://localhost:3000/api/books/filter?sortBy=rating&order=desc"

# Kombinasi lengkap
curl "http://localhost:3000/api/books/filter?genre=Programming&minHarga=50000&maxHarga=200000&minRating=4&sortBy=harga&order=asc"
```

---

### Menggunakan Postman

#### Setup Request di Postman:

1. **Buka Postman**
2. **Klik "New Request"**
3. **Isi method dan URL**

| Request | Method | URL |
|---------|--------|-----|
| Get All Books | GET | `http://localhost:3000/api/books` |
| Get Book by ID | GET | `http://localhost:3000/api/books/{id}` |
| Create Book | POST | `http://localhost:3000/api/books` |
| Update Book | PUT | `http://localhost:3000/api/books/{id}` |
| Delete Book | DELETE | `http://localhost:3000/api/books/{id}` |
| Filter Books | GET | `http://localhost:3000/api/books/filter?genre=Programming` |

#### Headers (untuk POST & PUT):
```
Key: Content-Type
Value: application/json
```

#### Body (untuk POST & PUT):
Pilih tab **"Body"** → **"raw"** → **"JSON"**

Contoh body:
```json
{
  "judul": "Belajar Express.js",
  "penulis": "Citra Dewi",
  "genre": "Programming",
  "harga": 125000,
  "rating": 4.7,
  "stock": 20
}
```

---

### Menggunakan Thunder Client (VS Code Extension)

1. Install extension **"Thunder Client"** di VS Code
2. Buka Thunder Client (icon petir di sidebar)
3. Klik **"New Request"**
4. Isi method dan URL seperti di atas
5. Untuk POST/PUT, tambahkan:
   - Headers: `Content-Type: application/json`
   - Body: pilih JSON dan isi data buku

## 📤 Deployment ke GitHub

### Langkah 1: Inisialisasi Git Repository

```bash
git init
```

### Langkah 2: Buat file `.gitignore` (sudah dibuat sebelumnya)

Pastikan file `.gitignore` sudah ada dengan konten:
```
node_modules/
.env
serviceAccountKey.json
```

### Langkah 3: Commit semua file

```bash
git add .
git commit -m "Initial commit: Books API with Firebase Firestore"
```

### Langkah 4: Buat repository di GitHub

1. Buka [github.com](https://github.com/)
2. Klik **"New repository"**
3. Isi nama repository (contoh: `books-api-firebase`)
4. Jangan centang "Initialize this repository with a README"
5. Klik **"Create repository"**

### Langkah 5: Push ke GitHub

```bash
# Tambahkan remote origin (ganti USERNAME dan REPO_NAME)
git remote add origin https://github.com/USERNAME/books-api-firebase.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

## 📊 Contoh Response API

### Success Response (GET all books):

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "abc123xyz",
      "judul": "Belajar Node.js Dasar",
      "penulis": "Andi Wijaya",
      "genre": "Programming",
      "harga": 150000,
      "rating": 4.8,
      "stock": 10,
      "deskripsi": "Buku panduan lengkap Node.js",
      "gambarUrl": "https://example.com/cover.jpg",
      "penerbit": "Gramedia",
      "tahunTerbit": 2025,
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

### Error Response:

```json
{
  "success": false,
  "error": "Buku tidak ditemukan",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---
