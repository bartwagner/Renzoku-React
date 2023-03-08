import React from 'react'
import './App.css'
import Questions from './components/Questions'
import {nanoid} from "nanoid"

function App() {
  const [startQuiz,setStartQuiz] = React.useState(false);
  const [allQuestionsRequest, setAllQuestionsRequest] = React.useState([]);
  const [allQuestions, setAllQuestions] = React.useState([]);

  React.useEffect(()=>{
    async function getAllQuestionsRequest(){
      const res = await fetch ("https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple")
      const data = await res.json()
      setAllQuestionsRequest(data.results)
    }
    getAllQuestionsRequest()
  }, [])

  function quizQuestions(){
    setStartQuiz(true)
    mixQuestions()
  }

  function mixQuestions(){
    let newQuestions = []
    for(let i = 0; i < allQuestionsRequest.length; i++)
    {
      newQuestions.push(allQuestionsNew(allQuestionsRequest[i]))
    }
    setAllQuestions(newQuestions)
  }

  function copy(x) {
    return JSON.parse( JSON.stringify(x) );
  }

  function allQuestionsNew(newQuest){
      let OrganizeQuestion = [{
        questionQuiz:"",
        answers:[],
        incorrectAnswers:[],
        correctAnswer: ""
      }]
      OrganizeQuestion.questionQuiz = newQuest.question
      OrganizeQuestion.answers = copy(newQuest.incorrect_answers)
      OrganizeQuestion.answers.splice(
                                  Math.floor(
                                    Math.random() * newQuest.incorrect_answers.length
                                  ), 0, newQuest.correct_answer
                                )                  
      OrganizeQuestion.incorrectAnswers = newQuest.incorrect_answers
      OrganizeQuestion.correctAnswer = newQuest.correct_answer

      return OrganizeQuestion
  }

  const loadAllQuestions = allQuestions.map(allQuestions =>(
    <Questions
      key={nanoid()}
      allQuestions={allQuestions}
    />
  ))

  return (
    <main>
    {
      startQuiz === true
      ?
      (
        <form>
          <div>
            {loadAllQuestions}
          </div>
          <div className='div--button'>
            <button className='check--button'>Check answers</button>
          </div>
        </form>
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