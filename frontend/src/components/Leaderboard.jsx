import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/api';

const Leaderboard = ({ onBack, currentPlayerName }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await getLeaderboard(10);
        setLeaderboard(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load leaderboard');
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  if (loading) {
    return (
      <div className="leaderboard-screen">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-screen">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={onBack} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-screen">
      <div className="leaderboard-container">
        <h1 className="leaderboard-title">🏆 Leaderboard</h1>
        <p className="leaderboard-subtitle">Top 10 Quiz Masters</p>

        {leaderboard.length === 0 ? (
          <div className="empty-leaderboard">
            <p>No scores yet. Be the first to play!</p>
          </div>
        ) : (
          <div className="leaderboard-list">
            {leaderboard.map((entry, index) => (
              <div
                key={entry._id}
                className={`leaderboard-item ${
                  entry.playerName === currentPlayerName ? 'current-player' : ''
                } ${index < 3 ? 'top-three' : ''}`}
              >
                <div className="rank">
                  <span className="rank-medal">{getMedalEmoji(index + 1)}</span>
                </div>

                <div className="player-details">
                  <div className="player-name">
                    {entry.playerName}
                    {entry.playerName === currentPlayerName && (
                      <span className="you-badge">You</span>
                    )}
                  </div>
                  <div className="player-stats">
                    <span className="stat">
                      📊 {entry.percentage}%
                    </span>
                    <span className="stat">
                      ⏱️ {formatTime(entry.timeTaken)}
                    </span>
                  </div>
                </div>

                <div className="player-score">
                  <div className="score-value">{entry.score}</div>
                  <div className="score-label">/{entry.totalQuestions}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={onBack} className="back-button">
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;