const SongService = require('../services/songService');

const searchSongs = async (req, res) => {
  const name = req.query.name;
  const songs = await SongService.searchSongs(name);
  res.json(songs);
}

module.exports = {
    searchSongs
};