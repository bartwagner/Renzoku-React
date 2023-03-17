import React from 'react'
import './App.css'
import Questions from './components/Questions'
import {nanoid} from 'nanoid'
import Confetti from "react-confetti"

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
  -----------------This state returns if the check answers button was clicked------------------
  -------------------------------------------------------------------------------------------*/
  const [checkCorrectAnswerButton,setCheckCorrectAnswerButton] = React.useState(false);

  /*-------------------------------------------------------------------------------------------
  ---------------------State that calculates how many questions are right----------------------
  -------------------------------------------------------------------------------------------*/  
  const [countAnswers, setCountAnswers] = React.useState(0);

  /*-------------------------------------------------------------------------------------------
  -------This method calls getAllQuestionRequest the first time and loads the questions--------
  -------------------------------------------------------------------------------------------*/
  React.useEffect(()=>{
    getAllQuestionsRequest()
  }, [])

  /*-------------------------------------------------------------------------------------------
  ------------------------This method loads all API questions and answers----------------------
  -------------------------------------------------------------------------------------------*/
  async function getAllQuestionsRequest(){
    await fetch ("https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple")
      .then (res => res.json())
      .then (data => setAllQuestionsRequest(data.results))
      .catch([])
  }

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

  /*---------------------This method organizes the list and inserts an ID for------------------ 
  -each question. It also will ask the createAnswerArray method to insert an ID, selectAnswer--
  ---------check if the question was selected and selectAnswerCorrect correct Answer---------*/
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

      //Replace the special characters
      newQuest.question = replaceText(newQuest.question)
      for(let i = 0; i < newQuest.incorrect_answers.length; i++){
        newQuest.incorrect_answers[i] = replaceText(newQuest.incorrect_answers[i])
      }
      newQuest.correct_answer = replaceText(newQuest.correct_answer)

      //Organize the information in new array
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

      OrganizeQuestion.answersArray = (createAnswerArray(OrganizeQuestion.answers,  OrganizeQuestion.correctAnswer)) //Create array answer, idAnswer, answer and selectAnswer

      return OrganizeQuestion                                            //return the array one by one
  }

  /*---------------------------------This method applies a ------------------------------------
  ---------------replaceAll to the text showing special characters again-----------------------
  -------------------------------------------------------------------------------------------*/
  function replaceText(text){
      text = text.replaceAll(/&quot;/g, '"')
      text = text.replaceAll(/&#039;/g, "'")
      text = text.replaceAll(/&amp;/g, '&')
      text = text.replaceAll(/&Agrave/g, 'À')
      text = text.replaceAll(/&Aacute;/g, 'Á')
      text = text.replaceAll(/&Acirc;/g, 'Â')
      text = text.replaceAll(/&Atilde;/g, 'Ã')
      text = text.replaceAll(/&Auml;/g, 'Ä')
      text = text.replaceAll(/&Aring;/g, 'Å')
      text = text.replaceAll(/&agrave;/g, 'à')
      text = text.replaceAll(/&aacute;/g, 'á')
      text = text.replaceAll(/&acirc;/g, 'â')
      text = text.replaceAll(/&atilde;/g, 'ã')
      text = text.replaceAll(/&auml;/g, 'ä')
      text = text.replaceAll(/&aring;/g, 'å')
      text = text.replaceAll(/&AElig;/g, 'Æ')
      text = text.replaceAll(/&aelig;/g, 'æ')
      text = text.replaceAll(/&szlig;/g, 'ß')
      text = text.replaceAll(/&Ccedil;/g, 'Ç')
      text = text.replaceAll(/&ccedil;/g, 'ç')
      text = text.replaceAll(/&Egrave;/g, 'È')
      text = text.replaceAll(/&Eacute;/g, 'É')
      text = text.replaceAll(/&Ecirc;/g, 'Ê')
      text = text.replaceAll(/&Euml;/g, 'Ë')
      text = text.replaceAll(/&egrave;/g, 'è')
      text = text.replaceAll(/&eacute;/g, 'é')
      text = text.replaceAll(/&ecirc;/g, 'ê')
      text = text.replaceAll(/&euml;/g, 'ë')
      text = text.replaceAll(/&#131;/g, 'ƒ')
      text = text.replaceAll(/&Igrave;/g, 'Ì')
      text = text.replaceAll(/&Iacute;/g, 'Í')
      text = text.replaceAll(/&Icirc;/g, 'Î')
      text = text.replaceAll(/&Iuml;/g, 'Ï')
      text = text.replaceAll(/&igrave;/g, 'ì')
      text = text.replaceAll(/&iacute;/g, 'í')
      text = text.replaceAll(/&icirc;/g, 'î')
      text = text.replaceAll(/&iuml;/g, 'ï')
      text = text.replaceAll(/&Ntilde;/g, 'Ñ')
      text = text.replaceAll(/&ntilde;/g, 'ñ')
      text = text.replaceAll(/&Ograve;/g, 'Ò')
      text = text.replaceAll(/&Oacute;/g, 'Ó')
      text = text.replaceAll(/&Ocirc;/g, 'Ô')
      text = text.replaceAll(/&Otilde;/g, 'Õ')
      text = text.replaceAll(/&Ouml;/g, 'Ö')
      text = text.replaceAll(/&ograve;/g, 'ò')
      text = text.replaceAll(/&oacute;/g, 'ó')
      text = text.replaceAll(/&ocirc;/g, 'ô')
      text = text.replaceAll(/&otilde;/g, 'õ')
      text = text.replaceAll(/&ouml;/g, 'ö')
      text = text.replaceAll(/&Oslash;/g, 'Ø')
      text = text.replaceAll(/&oslash;/g, 'ø')
      text = text.replaceAll(/&#140;/g, 'Œ')
      text = text.replaceAll(/&#156;/g, 'œ')
      text = text.replaceAll(/&#138;/g, 'Š')
      text = text.replaceAll(/&#154;/g, 'š')
      text = text.replaceAll(/&Ugrave;/g, 'Ù')
      text = text.replaceAll(/&Uacute;/g, 'Ú')
      text = text.replaceAll(/&Ucirc;/g, 'Û')
      text = text.replaceAll(/&Uuml;/g, 'Ü')
      text = text.replaceAll(/&ugrave;/g, 'ù')
      text = text.replaceAll(/&uacute;/g, 'ú')
      text = text.replaceAll(/&ucirc;/g, 'û')
      text = text.replaceAll(/&uuml;/g, 'ü')
      text = text.replaceAll(/&#181;/g, 'µ')
      text = text.replaceAll(/&#215;/g, '×')
      text = text.replaceAll(/&Yacute;/g, 'Ý')
      text = text.replaceAll(/&#159;/g, 'Ÿ')
      text = text.replaceAll(/&yacute;/g, 'ý')
      text = text.replaceAll(/&yuml;/g, 'ÿ')
      text = text.replaceAll(/&#176;/g, '°')
      text = text.replaceAll(/&#134;/g, '†')
      text = text.replaceAll(/&#135;/g, '‡')
      text = text.replaceAll(/&lt;/g, '<')
      text = text.replaceAll(/&gt;/g, '>')
      text = text.replaceAll(/&#177;/g, '±')
      text = text.replaceAll(/&#171;/g, '«')
      text = text.replaceAll(/&#187;/g, '»')
      text = text.replaceAll(/&#191;/g, '¿')
      text = text.replaceAll(/&#161;/g, '¡')
      text = text.replaceAll(/&#183;/g, '·')
      text = text.replaceAll(/&#149;/g, '•')
      text = text.replaceAll(/&#153;/g, '™')
      text = text.replaceAll(/&copy;/g, '©')
      text = text.replaceAll(/&reg;/g, '®')
      text = text.replaceAll(/&#167;/g, '§')
      text = text.replaceAll(/&#182;/g, '¶')
    return text
  }

  /*-------------------------------------------------------------------------------------------
  ----------This method that creates the list with idAnswer, answer, and selectAnswer----------
  -------------------------------------------------------------------------------------------*/
  function createAnswerArray(answers, correctAnswer){
    let arrayAnswers = []
    for(let i = 0; i < answers.length; i++)
    {
      arrayAnswers.push(AtributeAnswerArray(answers[i], correctAnswer))
    }
    return arrayAnswers
  }

  /*----------------------This method creates idAnswer,---------------------------------------- 
  ---------selectAnswer, in addition to associating an answer and inform if the----------------
  -----------------selectAnswerCorrect is true or false one by one---------------------------*/
  function AtributeAnswerArray(answers, correctAnswer){
    return{
      idAnswer:     nanoid(),
      answer:       answers,
      selectAnswer: false,
      selectAnswerCorrect : answers === correctAnswer ? true : false
    }
  }

  /*------This method checks which is the Question and which was the question selected--------- 
  --------by the user, thus changing the selectAnswer to true and failing this control---------
  -------------------------------------------------------------------------------------------*/
  function checkArray(idAnswer, idQuestion){
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

  /*------------------------------------------------------------------------------------------- 
  ------------------------This method counts how many questions are right----------------------
  -------------------------------------------------------------------------------------------*/
  function countCorrectAnswers(){    
    let count = 0
    allQuestions.map(q =>{
      return q.answersArray.map(a =>
          {
            return a.selectAnswer === true && a.selectAnswerCorrect === true ?
            count = count + 1 : count
          }  
        )
      }
    )
    setCountAnswers(count)
  }

  /*------------------------------------------------------------------------------------------- 
  -----------------The method that checks if the how many answers are correct------------------
  -------------------------------------------------------------------------------------------*/
  function checkCorrectAnswer() {
    setCheckCorrectAnswerButton(true)
    countCorrectAnswers()
  }

  /*--------This method sets setStartQuiz to false, loads the homepage again,------------------ 
  ------------setCheckCorrectAnswerButton to false so the answers are not green,---------------
  -----------------------and getAllQuestionsRequest loads new questions----------------------*/
  function playGameAgain(){
    setStartQuiz(false)
    setCheckCorrectAnswerButton(false)
    getAllQuestionsRequest()
    setCountAnswers(0)
  }

  const loadAllQuestions = allQuestions.map(q=>(
    <Questions
      key={q.idQuestion}
      allQuestions={q}
      checkArray={checkArray}
      checkCorrectAnswerButton={checkCorrectAnswerButton}
    />
  ))

  return (
    <main>
    {
      startQuiz === true
      ?
      (
        <div className='div--question'>
          {countAnswers >= 3 ? <Confetti /> : ""}       
          <div>
            {loadAllQuestions}
          </div>
          <div className='div--button'>
            {
              checkCorrectAnswerButton === false
              ?
              (
                <button className='check--button' onClick={checkCorrectAnswer}>Check answers</button>
              ):
              (
                <div className='correct--play'>
                  <h2 className='scored--answer'>You scored {countAnswers}/5 correct Answers</h2>
                  <button className="check--button" onClick={playGameAgain}>Play again</button>
                </div>
              )

            }
          </div>
        </div>
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