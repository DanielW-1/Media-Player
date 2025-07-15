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
const addSong = async (songData) => {
  const { title, artist, album, genre, file_url } = songData;

  const query = `
    INSERT INTO songs (title, artist, album, genre, file_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [title, artist, album, genre, file_url];

  try {
    const result1 = await pool.query(query, values);
    return result1.rows[0]; // return the inserted song
  } catch (err) {
    console.error('Error in insertSong:', err);
    throw err;
  }
};

module.exports = {
  findSongsByName,
  addSong
};