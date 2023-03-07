import React from 'react'
import './App.css'
import Questions from './components/Questions';

function App() {
  const [startQuiz,setStartQuiz] = React.useState(false);
  const [allQuestions, SetAllQuestions] = React.useState([]);

  React.useEffect(()=>{
    async function getAllQuestions(){
      const res = await fetch ("https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple")
      const data = await res.json()
      SetAllQuestions(data.results)
    }
    getAllQuestions()
  }, [])

  function quizQuestions(){
    setStartQuiz(true)
  }

  return (
    <main>
    {
      startQuiz === true
      ?
      (
        <Questions
          allQuestions={allQuestions[0]}
        />
      ):
      (
        <div className="main--page">
          <div className='img--up'/>
          <h1 className="main--name">Quizzical</h1>
          <a className="main--description">Some description if needed</a>
          <button className="star--button" onClick={quizQuestions}>Star quiz</button>
        <div className='img--botton'/>
        </div>
      )
    }
    </main>
  )
}

export default App