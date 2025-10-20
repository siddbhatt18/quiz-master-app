const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    trim: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: Number, // in seconds
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

// Index for faster leaderboard queries
scoreSchema.index({ score: -1, timeTaken: 1 });

module.exports = mongoose.model('Score', scoreSchema);