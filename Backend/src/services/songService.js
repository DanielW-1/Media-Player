const SongModel = require('../models/songModel');

const searchSongs = (name) => SongModel.findSongsByName(name);
module.exports = {
    searchSongs
}