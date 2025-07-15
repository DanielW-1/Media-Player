const { Pool } = require('pg');
require('dotenv').config(); // if you're using a .env file

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',     // use your actual DB user
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'Media-Player',
  password: process.env.DB_PASSWORD || 'yourpassword',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;