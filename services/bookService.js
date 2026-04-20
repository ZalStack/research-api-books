const { db } = require('../config/firebase');

class BookService {
  // Get all books
  async getAllBooks() {
    const snapshot = await db.collection('books').get();
    const books = [];
    snapshot.forEach(doc => {
      books.push({ id: doc.id, ...doc.data() });
    });
    return books;
  }

  // Get book by ID
  async getBookById(id) {
    const docRef = await db.collection('books').doc(id).get();
    if (!docRef.exists) {
      throw new Error('Buku tidak ditemukan');
    }
    return { id: docRef.id, ...docRef.data() };
  }

  // Create new book (FIXED - sesuai struktur data Anda)
  async createBook(bookData) {
    const newBook = {
      judul: bookData.judul,
      penulis: bookData.penulis,
      genre: bookData.genre,
      deskripsi: bookData.deskripsi || '',
      gambarUrl: bookData.gambarUrl || '',
      penerbit: bookData.penerbit || '',
      harga: Number(bookData.harga),
      rating: Number(bookData.rating),
      stock: Number(bookData.stock),
      tahunTerbit: bookData.tahunTerbit ? Number(bookData.tahunTerbit) : new Date().getFullYear(),
      createdAt: new Date().toISOString()
    };
    
    const docRef = await db.collection('books').add(newBook);
    return { id: docRef.id, ...newBook };
  }

  // Update book
  async updateBook(id, bookData) {
    const bookRef = db.collection('books').doc(id);
    const doc = await bookRef.get();
    
    if (!doc.exists) {
      throw new Error('Buku tidak ditemukan');
    }
    
    // Konversi tipe data yang perlu
    const updateData = { ...bookData };
    if (updateData.harga) updateData.harga = Number(updateData.harga);
    if (updateData.rating) updateData.rating = Number(updateData.rating);
    if (updateData.stock) updateData.stock = Number(updateData.stock);
    if (updateData.tahunTerbit) updateData.tahunTerbit = Number(updateData.tahunTerbit);
    
    await bookRef.update(updateData);
    const updated = await bookRef.get();
    return { id: updated.id, ...updated.data() };
  }

  // Delete book
  async deleteBook(id) {
    const bookRef = db.collection('books').doc(id);
    const doc = await bookRef.get();
    
    if (!doc.exists) {
      throw new Error('Buku tidak ditemukan');
    }
    
    await bookRef.delete();
    return { message: 'Buku berhasil dihapus', id };
  }

  // Filter and sort books
  async filterAndSortBooks(filters = {}, sortBy = null, order = 'asc') {
    let query = db.collection('books');
    
    // Filtering
    if (filters.genre && filters.genre !== 'all') {
      query = query.where('genre', '==', filters.genre);
    }
    
    if (filters.minHarga) {
      query = query.where('harga', '>=', Number(filters.minHarga));
    }
    
    if (filters.maxHarga) {
      query = query.where('harga', '<=', Number(filters.maxHarga));
    }
    
    if (filters.minRating) {
      query = query.where('rating', '>=', Number(filters.minRating));
    }
    
    // Sorting
    if (sortBy && ['harga', 'rating', 'judul'].includes(sortBy)) {
      query = query.orderBy(sortBy, order);
    }
    
    const snapshot = await query.get();
    const books = [];
    snapshot.forEach(doc => {
      books.push({ id: doc.id, ...doc.data() });
    });
    
    return books;
  }

  // Get all unique genres
  async getGenres() {
    const snapshot = await db.collection('books').get();
    const genres = new Set();
    snapshot.forEach(doc => {
      if (doc.data().genre) {
        genres.add(doc.data().genre);
      }
    });
    return Array.from(genres);
  }
}

module.exports = new BookService();