import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerClass = () => {
    if (timeLeft <= 30) return 'timer critical';
    if (timeLeft <= 60) return 'timer warning';
    return 'timer';
  };

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className={getTimerClass()}>
      <div className="timer-icon">⏱️</div>
      <div className="timer-content">
        <div className="timer-text">{formatTime(timeLeft)}</div>
        <div className="timer-bar">
          <div 
            className="timer-bar-fill" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Timer;