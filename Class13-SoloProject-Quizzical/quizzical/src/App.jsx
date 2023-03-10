import React from 'react'
import './App.css'
import Questions from './components/Questions'
import {nanoid} from 'nanoid'

function App() {

  /*--------------------------------------------------------------------------------------------
  ----------------------variable checks if the user clicks on the button quiz-------------------
  --------------------------------------------------------------------------------------------*/
  const [startQuiz,setStartQuiz] = React.useState(false);


  /*--------------------------------------------------------------------------------------------
  -------------------------The state gets all data from the unordered API-----------------------
  --------------------------------------------------------------------------------------------*/
  const [allQuestionsRequest, setAllQuestionsRequest] = React.useState([]);
  

  /*-------------------------------------------------------------------------------------------
  ----The state stores all information organized by the CreateOrganizeArrayQuestions method----
  -------------------------------------------------------------------------------------------*/
  const [allQuestions, setAllQuestions] = React.useState([]);


  /*-------------------------------------------------------------------------------------------
  ------------receives the unordered API and sends to the State allQuestionsRequest------------
  -------------------------------------------------------------------------------------------*/
  React.useEffect(()=>{
    async function getAllQuestionsRequest(){
      const res = await fetch ("https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple")
      const data = await res.json()
      setAllQuestionsRequest(data.results)
    }
    getAllQuestionsRequest()
  }, [])


  /*-------------After the user clicks on the Star Quiz button, the system calls---------------
  CreateOrganizeArrayQuestions which sorts the API list and also sets the setStartQuiz variable 
  ------------------------to true which will then display the questions----------------------*/
  function quizQuestions(){
    CreateOrganizeArrayQuestions()
    setStartQuiz(true)
  }


  /*------------------------Create a sorted list by passing the unsorted array-----------------
  --one at a time through the allQuestionsNew method and create a new sorted list by inserting-
  ---------------------------------------them one at a time----------------------------------*/
  function CreateOrganizeArrayQuestions(){
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


  /*---------------------------This method organizes the list and------------------------------ 
  --inserts an ID for each question. It also will ask the createAnswerArray method to insert---
  ---------------------an ID and check if the question was selected--------------------------*/
  function allQuestionsNew(newQuest){
      let OrganizeQuestion = [{
        idQuestion: "",
        questionQuiz: "",
        answers: [],
        answersArray: [],
        incorrectAnswers:[],
        correctAnswer: "",
        selectQuestion: false
      }]
      OrganizeQuestion.idQuestion = nanoid()                             //NewID
      OrganizeQuestion.questionQuiz = newQuest.question                  //Question
      OrganizeQuestion.answers = copy(newQuest.incorrect_answers)        //input incorrect_answers into answer
      OrganizeQuestion.answers.splice(
                                      Math.floor(
                                                 Math.random() * newQuest.incorrect_answers.length
                                      ), 0, newQuest.correct_answer
      )                                                                  //input correct_answer into answer
      OrganizeQuestion.incorrectAnswers = newQuest.incorrect_answers     //incorrect_answers
      OrganizeQuestion.correctAnswer = newQuest.correct_answer           //correct_answer
      OrganizeQuestion.selectQuestion = false                            //selectQuestion starts false

      OrganizeQuestion.answersArray = (createAnswerArray(OrganizeQuestion.answers)) //Create array answer, idAnswer, answer and selectAnswer

      return OrganizeQuestion                                            //return the array one by one
  }

  function createAnswerArray(answers){
    let arrayAnswers = []
    for(let i = 0; i < answers.length; i++)
    {
      arrayAnswers.push(AtributeAnswerArray(answers[i]))
    }
    return arrayAnswers
  }

  function AtributeAnswerArray(answers){
    return{
      idAnswer:     nanoid(),
      answer:       answers,
      selectAnswer: false
    }
  }

  function CheckArray(idAnswer, idQuestion){
    setAllQuestions(questions => questions.map(q => {
      return q.idQuestion === idQuestion ? {
                  ...q,
                  answersArray: q.answersArray.map(a =>
                                { return a.idAnswer === idAnswer ? {
                                  ...a, selectAnswer: !a.selectAnswer
                                  } : {...a, selectAnswer: false}
                                }
                  )
      }: q
    }))
  }

  const loadAllQuestions = allQuestions.map(q=>(
    <Questions
      key={q.idQuestion}
      allQuestions={q}
      CheckArray={CheckArray}
    />
  ))

  return (
    <main>
    {
      startQuiz === true
      ?
      (
        <form className='form--question'>
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