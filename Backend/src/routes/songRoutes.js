const express = require('express');
const router = express.Router();
const SongController = require('../controllers/songController');

router.get('/search', SongController.searchSongs);
router.post('/addSong', SongController.addSong);
router.get('/stream/:id', SongController.streamSong);

module.exports = router;