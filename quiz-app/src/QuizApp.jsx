import React, { useState } from 'react';
import questions from './questions'; // Pfad zu Ihrer Fragen-Datei
import './QuizApp.css';

function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextClick = () => {
    if (currentQuestion < questions.length - 1) {
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setSelectedAnswer(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="quiz-container">
      {!showScore ? (
        <>
          <h2 className="quiz-question">{decodeURIComponent(escape(questions[currentQuestion].question))}</h2>
          {questions[currentQuestion].answers.map((answer) => (
            <button
              key={answer}
              className={`answer-button ${selectedAnswer === answer ? (answer === questions[currentQuestion].correctAnswer ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleAnswerClick(answer)}
            >
              {decodeURIComponent(escape(answer))}
            </button>
          ))}
          <button
            className="next-button"
            onClick={handleNextClick}
            disabled={selectedAnswer === null}
          >
            Next Question
          </button>
          <p className="score">Score: {score}</p>
        </>
      ) : (
        <>
          <h2>Du hast {score} richtige Antworten</h2>
          <button onClick={restartQuiz}>Neu beginnen</button>
        </>
      )}
    </div>
  );
}

export default QuizApp;