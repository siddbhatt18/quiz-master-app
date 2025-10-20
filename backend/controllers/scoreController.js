const Score = require('../models/Score');

// Submit score
exports.submitScore = async (req, res) => {
  try {
    const { playerName, score, totalQuestions, timeTaken } = req.body;

    // Validate input
    if (!playerName || score === undefined || !totalQuestions || !timeTaken) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const percentage = ((score / totalQuestions) * 100).toFixed(2);

    const newScore = await Score.create({
      playerName,
      score,
      totalQuestions,
      timeTaken,
      percentage,
    });

    res.status(201).json({
      success: true,
      message: 'Score submitted successfully',
      data: newScore,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting score',
      error: error.message,
    });
  }
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const leaderboard = await Score.find()
      .sort({ score: -1, timeTaken: 1 }) // Higher score, less time = better
      .limit(limit)
      .select('playerName score totalQuestions timeTaken percentage createdAt');

    res.json({
      success: true,
      count: leaderboard.length,
      data: leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard',
      error: error.message,
    });
  }
};

// Get user's best score
exports.getUserBestScore = async (req, res) => {
  try {
    const { playerName } = req.params;

    const bestScore = await Score.findOne({ playerName })
      .sort({ score: -1, timeTaken: 1 })
      .select('playerName score totalQuestions timeTaken percentage createdAt');

    if (!bestScore) {
      return res.status(404).json({
        success: false,
        message: 'No scores found for this player',
      });
    }

    res.json({
      success: true,
      data: bestScore,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user score',
      error: error.message,
    });
  }
};