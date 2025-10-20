import React from 'react';

const ResultScreen = ({ result, onRestart, onViewLeaderboard }) => {
  const { score, totalQuestions, percentage, timeTaken, questions, answers } = result;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', emoji: '🏆', message: 'Outstanding!' };
    if (percentage >= 80) return { grade: 'A', emoji: '🌟', message: 'Excellent!' };
    if (percentage >= 70) return { grade: 'B', emoji: '👏', message: 'Great Job!' };
    if (percentage >= 60) return { grade: 'C', emoji: '👍', message: 'Good Effort!' };
    if (percentage >= 50) return { grade: 'D', emoji: '📚', message: 'Keep Practicing!' };
    return { grade: 'F', emoji: '💪', message: 'Don\'t Give Up!' };
  };

  const gradeInfo = getGrade(parseFloat(percentage));

  return (
    <div className="result-screen">
      <div className="result-container">
        <div className="result-header">
          <div className="result-emoji">{gradeInfo.emoji}</div>
          <h1 className="result-title">{gradeInfo.message}</h1>
          <div className="result-grade">Grade: {gradeInfo.grade}</div>
        </div>

        <div className="result-stats">
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-value">{score}/{totalQuestions}</div>
            <div className="stat-label">Correct Answers</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{percentage}%</div>
            <div className="stat-label">Score</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-value">{formatTime(timeTaken)}</div>
            <div className="stat-label">Time Taken</div>
          </div>
        </div>

        <div className="answer-review">
          <h3>📝 Answer Review</h3>
          <div className="review-list">
            {questions.map((question, index) => {
              const userAnswer = answers[question._id];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div 
                  key={question._id} 
                  className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}
                >
                  <div className="review-header">
                    <span className="review-number">Q{index + 1}</span>
                    <span className={`review-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="review-question">{question.question}</div>
                  <div className="review-answers">
                    {userAnswer !== undefined && (
                      <div className={`review-answer ${isCorrect ? 'correct' : 'incorrect'}`}>
                        Your answer: {question.options[userAnswer]}
                      </div>
                    )}
                    {!isCorrect && (
                      <div className="review-answer correct">
                        Correct answer: {question.options[question.correctAnswer]}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="result-actions">
          <button onClick={onRestart} className="action-button primary">
            🔄 Take Another Quiz
          </button>
          <button onClick={onViewLeaderboard} className="action-button secondary">
            🏆 View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;