import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [quizData, setQuizData] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const startQuiz = () => setIsQuizStarted(true);
  function renderQuiz() {
    return (
      <div className='mt-10'>
      <h1 className="text-3xl text-center font-bold">
      {`Q1: ${quizData[0].question.text}`}
      </h1>
      </div>
    )
  }
  useEffect(()=>{
    axios("https://the-trivia-api.com/v2/questions")
      .then(res => setQuizData(res.data))
      .catch((err) => {
        console.log(err);
      })
  }, []);
  return (
    <div className='text-center mt-[10rem]'>
      <h1 className="text-3xl text-center font-bold">
        React Quiz App!
      </h1>
      {quizData.length &&  isQuizStarted > 0 ? renderQuiz() : <div>
        <h1 className="text-3xl text-center mt-16 font-semibold">Test Your Knowledge!</h1>
        <button onClick={startQuiz} className="btn mt-20 mb-10 text-white btn-success">Start Quiz</button>
      </div>
      }
    </div>
  )
}

export default App