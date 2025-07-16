const SongModel = require('../models/songModel');
const path = require('path');
const fs = require('fs');

const searchSongs = (name) => SongModel.findSongsByName(name);
const addSong = (song) => SongModel.addSong(song);

const streamSongById = async (songId, req, res) => {
  // 1. Fetch song metadata from DB
  const song = await SongModel.findSongById(songId);

  if (!song || !song.file_url) {
    return res.status(404).json({ message: 'Song not found' });
  }

  const songPath = path.resolve(__dirname, '../../../Media-Storage', song.file_url); // full path
   const stat = await fs.promises.stat(songPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (!range) {
    // Full stream fallback
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'audio/mpeg',
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=86400', // 1 day
    });
    fs.createReadStream(songPath)
        .on('error', (err) => {
          console.error('Stream error:', err);
          res.status(500).end('Internal Server Error');
        })
        .pipe(res);
      return;
  } else {
    // Partial stream (for seeking/buffering)
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(songPath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=86400',
    });
    file
      .on('error', (err) => {
        console.error('Stream error:', err);
        res.status(500).end('Internal Server Error');
      })
      .pipe(res);

  }
};

module.exports = {
    searchSongs,
    addSong,
    streamSongById
}