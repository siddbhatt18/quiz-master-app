import React, { useState, useEffect, useCallback } from 'react';
import Question from './Question';
import Timer from './Timer';
import { getQuestions, submitScore } from '../services/api';

const Quiz = ({ playerName, onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime] = useState(Date.now());

  const QUIZ_DURATION = 300; // 5 minutes in seconds

  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getQuestions(10);
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load questions. Please try again.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSelectAnswer = (answerIndex) => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex]._id]: answerIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = useCallback(() => {
    let score = 0;
    questions.forEach((question) => {
      if (answers[question._id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  }, [questions, answers]);

  const handleSubmit = useCallback(async () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const score = calculateScore();

    const scoreData = {
      playerName,
      score,
      totalQuestions: questions.length,
      timeTaken,
    };

    try {
      await submitScore(scoreData);
      onComplete({
        ...scoreData,
        percentage: ((score / questions.length) * 100).toFixed(2),
        questions,
        answers,
      });
    } catch (err) {
      console.error('Error submitting score:', err);
      // Still show results even if score submission fails
      onComplete({
        ...scoreData,
        percentage: ((score / questions.length) * 100).toFixed(2),
        questions,
        answers,
      });
    }
  }, [playerName, questions, answers, startTime, calculateScore, onComplete]);

  const handleTimeUp = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="player-info">
          <span className="player-name">👤 {playerName}</span>
        </div>
        <Timer duration={QUIZ_DURATION} onTimeUp={handleTimeUp} />
      </div>

      <div className="progress-section">
        <div className="progress-info">
          <span>Progress: {currentQuestionIndex + 1}/{questions.length}</span>
          <span>Answered: {answeredCount}/{questions.length}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <Question
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={answers[currentQuestion._id]}
        onSelectAnswer={handleSelectAnswer}
      />

      <div className="navigation-buttons">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="nav-button prev-button"
        >
          ← Previous
        </button>

        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="nav-button next-button"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="nav-button submit-button"
            disabled={answeredCount < questions.length}
          >
            Submit Quiz ✓
          </button>
        )}
      </div>

      {answeredCount < questions.length && currentQuestionIndex === questions.length - 1 && (
        <div className="warning-message">
          ⚠️ Please answer all questions before submitting
        </div>
      )}

      <div className="question-navigator">
        <h4>Question Navigator:</h4>
        <div className="question-dots">
          {questions.map((q, index) => (
            <button
              key={q._id}
              className={`question-dot ${
                index === currentQuestionIndex ? 'active' : ''
              } ${answers[q._id] !== undefined ? 'answered' : ''}`}
              onClick={() => setCurrentQuestionIndex(index)}
              title={`Question ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;