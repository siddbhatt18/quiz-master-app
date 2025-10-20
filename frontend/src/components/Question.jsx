import React from 'react';

const Question = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  selectedAnswer, 
  onSelectAnswer 
}) => {
  return (
    <div className="question-container">
      <div className="question-header">
        <span className="question-number">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="question-difficulty">
          {question.difficulty && (
            <span className={`difficulty ${question.difficulty}`}>
              {question.difficulty.toUpperCase()}
            </span>
          )}
        </span>
      </div>

      <div className="question-category">
        📚 {question.category || 'General Knowledge'}
      </div>

      <h2 className="question-text">{question.question}</h2>

      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => onSelectAnswer(index)}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;