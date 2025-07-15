const SongService = require('../services/songService');

const searchSongs = async (req, res) => {
  const name = req.query.name;
  const songs = await SongService.searchSongs(name);
  res.json(songs);
};
const addSong = async (req, res) => {
  try {
    const songData = req.body; 
    const addedSong = await SongService.addSong(songData); 
    res.status(201).json(addedSong); 
    
  } catch (err) {
    console.error('Error adding song:', err);
    res.status(500).json({ error: 'Failed to add song' });
  }
};
module.exports = {
    searchSongs,
    addSong
};