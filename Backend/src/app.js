// app.js
const express = require('express');
const app = express();
const path = require('path');
const songRoutes = require('./routes/songRoutes');

// Middleware
app.use(express.json()); // Parse incoming JSON

// Routes
app.use('/api/songs', songRoutes);

//Serve static frontend files
const frontendPath = path.resolve(__dirname, '../../Frontend');
app.use(express.static(frontendPath));

//Catch-all route to serve index.html (for frontend routing)
app.get('/{*splat}', (req, res) => {
  const indexPath = path.join(frontendPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error sending index.html:', err.message);
      res.status(500).send('Internal Server Error');
    }
  });
});
module.exports = app;
