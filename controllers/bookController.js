const bookService = require('../services/bookService');

class BookController {
  // GET - Ambil semua buku
  async getAllBooks(req, res, next) {
    try {
      const books = await bookService.getAllBooks();
      res.status(200).json({
        success: true,
        count: books.length,
        data: books
      });
    } catch (error) {
      next(error);
    }
  }

  // GET - Ambil buku by ID
  async getBookById(req, res, next) {
    try {
      const { id } = req.params;
      const book = await bookService.getBookById(id);
      res.status(200).json({
        success: true,
        data: book
      });
    } catch (error) {
      next(error);
    }
  }

  // POST - Tambah buku baru (FIXED)
  async createBook(req, res, next) {
    try {
      const requiredFields = ['judul', 'penulis', 'genre', 'harga', 'rating', 'stock'];
      
      // Perbaikan: cek req.body dengan benar
      const missingFields = requiredFields.filter(field => {
        return req.body[field] === undefined || req.body[field] === null || req.body[field] === '';
      });
      
      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          error: `Field yang diperlukan: ${missingFields.join(', ')}`,
          hint: "Contoh body: { \"judul\": \"Belajar Node.js\", \"penulis\": \"Andi\", \"genre\": \"Programming\", \"harga\": 150000, \"rating\": 4.8, \"stock\": 10 }"
        });
      }
      
      const newBook = await bookService.createBook(req.body);
      res.status(201).json({
        success: true,
        message: 'Buku berhasil ditambahkan',
        data: newBook
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT - Update buku
  async updateBook(req, res, next) {
    try {
      const { id } = req.params;
      const updatedBook = await bookService.updateBook(id, req.body);
      res.status(200).json({
        success: true,
        message: 'Buku berhasil diupdate',
        data: updatedBook
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE - Hapus buku
  async deleteBook(req, res, next) {
    try {
      const { id } = req.params;
      const result = await bookService.deleteBook(id);
      res.status(200).json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  // GET - Filter dan sort buku
  async filterAndSortBooks(req, res, next) {
    try {
      const { genre, minHarga, maxHarga, minRating, sortBy, order } = req.query;
      
      const filters = { genre, minHarga, maxHarga, minRating };
      const books = await bookService.filterAndSortBooks(filters, sortBy, order);
      
      res.status(200).json({
        success: true,
        count: books.length,
        filters: { genre, minHarga, maxHarga, minRating },
        sort: { sortBy, order: order || 'asc' },
        data: books
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookController();