const express = require('express');
const router = express.Router();
const {
  submitScore,
  getLeaderboard,
  getUserBestScore,
} = require('../controllers/scoreController');

// POST /api/scores
router.post('/', submitScore);

// GET /api/scores/leaderboard?limit=10
router.get('/leaderboard', getLeaderboard);

// GET /api/scores/user/:playerName
router.get('/user/:playerName', getUserBestScore);

module.exports = router;