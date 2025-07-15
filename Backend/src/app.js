// app.js
const express = require('express');
const app = express();
const songRoutes = require('./routes/songRoutes');

// Middleware
app.use(express.json()); // Parse incoming JSON

// Routes
app.use('/api/songs', songRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('🎵 Backend is running');
});

module.exports = app;
