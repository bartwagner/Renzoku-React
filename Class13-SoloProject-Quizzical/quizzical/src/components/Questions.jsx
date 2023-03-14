import React from 'react'
import Answers from './Answers'

export default function Questions(props){

    function changeColor(idAnswer, idQuestion) {
        props.checkArray(idAnswer, idQuestion)
    }

    const askAllAnswer = props.allQuestions.answersArray.map(answer =>(
         <Answers
             key={answer.idAnswer}
             idAnswer={answer.idAnswer}
             answer={answer.answer}
             selectAnswer={answer.selectAnswer}
             selectAnswerCorrect={answer.selectAnswerCorrect}
             changeColor={() => changeColor(answer.idAnswer, props.allQuestions.idQuestion)}
             checkCorrectAnswerButton={props.checkCorrectAnswerButton}
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