// server.js
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config(); // Load .env file

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🎧 Server is live on http://localhost:${PORT}`);
});