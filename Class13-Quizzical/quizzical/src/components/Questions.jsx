import React from 'react'
import Answers from './Answers'
import {nanoid} from 'nanoid'

export default function Questions(props){

    window.console.log(props)
    function ChangeColor(idAnswer, idQuestion) {
        window.console.log("clicked")
        // setDice(oldDice => oldDice.map(die => {
        //     return die.id === id ? 
        //         {...die, isHeld: !die.isHeld} :
        //         die
        // }))
        //onClick={ChangeColor(props.idAnswer, idQuestion)}
      }

      //window.console.log(props.allQuestions)

    const askAllAnswer = props.allQuestions.answersArray.map(answer =>(
         <Answers
             idAnswer={answer.idAnswer}
             answer={answer.answer}
             selectAnswer={answer.selectAnswer}
             ChangeColor={ChangeColor}
         />
    ))

    return(
            <div>
                <h1 className='question--quiz'>{props.allQuestions.questionQuiz}</h1>
                <div className='answer--option'>
                    {askAllAnswer}
                </div>
                <hr className='question--line'/>
            </div>

    )
}