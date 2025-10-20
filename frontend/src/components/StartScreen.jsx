import React, { useState } from 'react';

const StartScreen = ({ onStart }) => {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (playerName.trim().length < 2) {
      setError('Please enter a valid name (minimum 2 characters)');
      return;
    }
    
    setError('');
    onStart(playerName.trim());
  };

  return (
    <div className="start-screen">
      <div className="start-container">
        <h1 className="app-title">🎯 Quiz Master</h1>
        <p className="app-subtitle">Test your knowledge with our exciting quiz!</p>
        
        <div className="quiz-info">
          <div className="info-item">
            <span className="info-icon">📝</span>
            <span>10 Questions</span>
          </div>
          <div className="info-item">
            <span className="info-icon">⏱️</span>
            <span>5 Minutes</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🏆</span>
            <span>Compete for Top Score</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="start-form">
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="name-input"
            maxLength={30}
          />
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="start-button">
            Start Quiz 🚀
          </button>
        </form>

        <div className="rules">
          <h3>Rules:</h3>
          <ul>
            <li>You have 5 minutes to complete the quiz</li>
            <li>Each question has 4 options with only one correct answer</li>
            <li>Quiz will auto-submit when time runs out</li>
            <li>Your score will be added to the leaderboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;