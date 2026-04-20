const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books', bookRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    name: 'Books API',
    version: '1.0.0',
    endpoints: {
      'GET /api/books': 'Get all books',
      'GET /api/books/:id': 'Get book by ID',
      'POST /api/books': 'Create new book',
      'PUT /api/books/:id': 'Update book',
      'DELETE /api/books/:id': 'Delete book',
      'GET /api/books/filter?genre=&minHarga=&maxHarga=&minRating=&sortBy=&order=': 'Filter and sort books'
    }
  });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Books API ready at http://localhost:${PORT}/api/books`);
});
