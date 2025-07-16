const express = require('express');
const router = express.Router();
const SongController = require('../controllers/songController');

router.get('/search', SongController.searchSongs);
router.post('/addSong', SongController.addSong);

module.exports = router;