import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [quizData, setQuizData] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const startQuiz = () => {
    setIsQuizStarted(true);
    setCurrentQuestion(0);
    setTotalMarks(0);
  };
  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
      .then(res => {
        setQuizData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function renderQuiz() {
    if (currentQuestion < 10) {
      const ulArray = shuffleArray([quizData[currentQuestion].correctAnswer, ...quizData[currentQuestion].incorrectAnswers]);
      return (
        <div className='mt-10 my-container'>
          <h1 className="text-3xl text-center font-bold">
            {`Q${currentQuestion + 1}: ${quizData[currentQuestion].question.text}`}
          </h1>
          <div className='mt-10'>
            {ulArray.map((item, index) => (
              <div key={index}>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text text-base">{item}</span>
                    <input
                      type="radio"
                      name={`radio-${currentQuestion}`}
                      value={item}
                      className="radio checked:bg-[#00a96e]"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button onClick={checkAnswer} className="btn mt-10 mb-10 text-white btn-success">Next Question</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="text-3xl text-center font-semibold">Thanks for taking the Quiz!</h1>
          <h2 className="text-2xl text-center mt-4 font-semibold">Your Total Marks: {totalMarks}</h2>
          <button onClick={startQuiz} className="btn mt-10 mb-10 text-white btn-success">Retake Quiz</button>
        </div>
      );
    }
  }
  const checkAnswer = () => {
    const selected = document.querySelector(`input[name="radio-${currentQuestion}"]:checked`);
    if (selected) {
      console.log(selected);
      const selectedAnswer = selected.value;
      if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
        setTotalMarks(totalMarks + 20);
      }
    }
    setCurrentQuestion(currentQuestion + 1);
  };
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  console.log(totalMarks);
  return (
    <div className='text-center'>
      <div className='flex flex-col h-[100vh] justify-center'>
      <h1 className="text-3xl text-center mb-10 font-bold">React Quiz App!</h1>
      {isQuizStarted && quizData.length > 0 ? renderQuiz() : (
        <div>
          <h1 className="text-3xl text-center font-semibold">Test Your Knowledge!</h1>
          <button onClick={startQuiz} className="btn mt-10 mb-10 text-white btn-success">Start Quiz</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default App;