const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getAllQuestions,
  verifyAnswers,
} = require('../controllers/questionController');

// GET /api/questions?limit=10
router.get('/', getQuestions);

// GET /api/questions/all
router.get('/all', getAllQuestions);

// POST /api/questions/verify
router.post('/verify', verifyAnswers);

module.exports = router;