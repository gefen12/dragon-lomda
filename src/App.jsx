import React, { useState } from "react";
import "./App.css";

import dragon from "./assets/dragon.svg";
import dragonTale from "./assets/dragon-tale.svg";
import leopardPattern from "./assets/leopard2.png";
import tigerTool from "./assets/graphic-tiger-tool.svg";
import peleLanding from "./assets/pele-landing.png"; // Import the landing photo
import questions from './questions.json'; 

import WelcomeScreen from './components/WelcomeScreen';
import Header from "./components/Header";
import QuestionCard from "./components/QuestionCard";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showLandingPhoto, setShowLandingPhoto] = useState(false); // State to show landing photo

  const handleAnswer = (questionId, isCorrect) => {
    setResults((prevResults) => ({
      ...prevResults,
      [questionId]: isCorrect,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true); 
    }
  };

  const calculateScore = () => {
    return Object.values(results).filter((isCorrect) => isCorrect).length;
  };

  return (
    <div className="App">
      {!showLandingPhoto && ( // Show landing photo if state is false
      <>
      <Header />
      <img src={dragon} alt="dragon" className="dragon" oncontextmenu="return false;" />
      <img src={dragonTale} alt="dragon tale" className="dragon-tale" oncontextmenu="return false;" />
      </>
      )}
      {showLandingPhoto ? ( // Show landing photo if state is true
        <div className="pele-landing">
          <img src={peleLanding} alt="pele landing" className="pele-landing-photo" oncontextmenu="return false;" />
        </div>
      ) : (
        <>
          {showWelcome && <WelcomeScreen onStart={() => setShowWelcome(false)} />}
          {!showWelcome &&!quizCompleted && (
            <>
              <QuestionCard 
                question={questions[currentQuestionIndex]} 
                onNext={handleNext}
                onAnswer={handleAnswer}
                current={currentQuestionIndex + 1} // Pass current question index
                total={questions.length} // Pass total number of questions
              />
            </>
          )}
          {!showWelcome && quizCompleted && (() => {
  const grade = Math.round((calculateScore() / questions.length) * 100);
  if (grade > 60) {
    return (
      <div className="final-score">
        <div>סיימת את הלומדה בצורה קטלנית!</div>
        <p>הציון שלך: {grade}%</p>
        <button
          onClick={() => setShowLandingPhoto(true)}
          className="finish-button"
        >
          סיים
        </button>
      </div>
    );
  } else {
    return (
      <div className="final-score">
        <div>הציון שלך: {grade}%</div>
        <div>תרצה לנסות שוב?</div>
        <button
          onClick={() => {
            setQuizCompleted(false);
            setCurrentQuestionIndex(0);
            setResults({});
          }}
          className="finish-button"
        >
          נסה שוב
        </button>
      </div>
    );
  }
})()}
        </>
      )}
    </div>
  );
}

export default App;
