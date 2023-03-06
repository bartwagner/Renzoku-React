import React from 'react'
import './App.css'

function App() {
  const [allQuestions, SetAllQuestions] = React.useState([]);

  React.useEffect(()=>{
    async function getAllQuestions(){
      const res = await fetch ("https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple")
      const data = await res.json()
      SetAllQuestions(response_code.results)
    }
  })

  return (
    <main>
      <div className="main--page">
        <div className='img--up'/>
        <h1 className="main--name">Quizzical</h1>
        <a className="main--description">Some description if needed</a>
        <button className="star--button">Star quiz</button>
        <div className='img--botton'/>
      </div>
    </main>
  )
}

export default App