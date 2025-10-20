const Question = require('../models/Question');

// Get random questions
exports.getQuestions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Get random questions using aggregation
    const questions = await Question.aggregate([
      { $sample: { size: limit } },
      { 
        $project: { 
          question: 1, 
          options: 1, 
          correctAnswer: 1,
          difficulty: 1,
          category: 1
        } 
      }
    ]);

    res.json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching questions',
      error: error.message,
    });
  }
};

// Get all questions (for admin)
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching all questions',
      error: error.message,
    });
  }
};

// Verify answers
exports.verifyAnswers = async (req, res) => {
  try {
    const { answers } = req.body; // Array of { questionId, selectedAnswer }
    
    let correctCount = 0;
    const results = [];

    for (let answer of answers) {
      const question = await Question.findById(answer.questionId);
      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      
      if (isCorrect) correctCount++;
      
      results.push({
        questionId: answer.questionId,
        isCorrect,
        correctAnswer: question.correctAnswer,
      });
    }

    res.json({
      success: true,
      correctCount,
      totalQuestions: answers.length,
      percentage: ((correctCount / answers.length) * 100).toFixed(2),
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying answers',
      error: error.message,
    });
  }
};