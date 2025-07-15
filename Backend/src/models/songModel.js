const pool = require('../DB/db'); // adjust path if needed

const findSongsByName = async (name) => {
  try {
    const query = `
      SELECT * FROM songs
      WHERE title ILIKE $1
      LIMIT 10;
    `;
    const values = [`%${name}%`]; // partial match
    const result = await pool.query(query, values);
    return result.rows; // array of matching songs
  } catch (err) {
    console.error('Error in findSongsByName:', err);
    throw err;
  }
};

module.exports = {
  findSongsByName,
};