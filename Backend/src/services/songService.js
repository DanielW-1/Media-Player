const SongModel = require('../models/songModel');

const searchSongs = (name) => SongModel.findSongsByName(name);
const addSong = (song) => SongModel.addSong(song);
module.exports = {
    searchSongs,
    addSong
}