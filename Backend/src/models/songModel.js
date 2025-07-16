const pool = require('../DB/db');
const prisma = require('../DB/prisma');
const findSongsByName = async (name) => {
  try {
    const songs = await prisma.song.findMany({
      where: {
        title: {
          contains: name,
          mode: 'insensitive',
        },
      },
      take: 10,
    });
    return songs;
  } catch (err) {
    console.error('Error in findSongsByName:', err);
    throw err;
  }
};
const addSong = async (songData) => {
  const { title, artist, album, genre, file_url } = songData;
  try {
    const newSong = await prisma.song.create({
      data: {
        title,
        artist,
        album,
        genre,
        file_url,
      },
    });

    return newSong; // Prisma returns the inserted record
  } catch (err) {
    console.error('Error in addSong:', err);
    throw err;
  }
};

module.exports = {
  findSongsByName,
  addSong
};