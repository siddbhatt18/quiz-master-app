import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import ResultScreen from './components/ResultScreen';
import Leaderboard from './components/Leaderboard';
import './styles/App.css';

function App() {
  const [screen, setScreen] = useState('start'); // start, quiz, result, leaderboard
  const [playerName, setPlayerName] = useState('');
  const [quizResult, setQuizResult] = useState(null);

  const handleStart = (name) => {
    setPlayerName(name);
    setScreen('quiz');
  };

  const handleQuizComplete = (result) => {
    setQuizResult(result);
    setScreen('result');
  };

  const handleRestart = () => {
    setQuizResult(null);
    setScreen('start');
  };

  const handleViewLeaderboard = () => {
    setScreen('leaderboard');
  };

  const handleBackToStart = () => {
    setScreen('start');
  };

  return (
    <div className="app">
      {screen === 'start' && (
        <StartScreen onStart={handleStart} />
      )}

      {screen === 'quiz' && (
        <Quiz 
          playerName={playerName} 
          onComplete={handleQuizComplete} 
        />
      )}

      {screen === 'result' && quizResult && (
        <ResultScreen
          result={quizResult}
          onRestart={handleRestart}
          onViewLeaderboard={handleViewLeaderboard}
        />
      )}

      {screen === 'leaderboard' && (
        <Leaderboard 
          onBack={handleBackToStart}
          currentPlayerName={playerName}
        />
      )}
    </div>
  );
}

export default App;