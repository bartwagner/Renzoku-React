import React from 'react'
import Answers from './Answers'

export default function Questions(props){

    //window.console.log(props)

    function ChangeColor(idAnswer, idQuestion) {
        props.CheckArray(idAnswer, idQuestion)
    }

    const askAllAnswer = props.allQuestions.answersArray.map(answer =>(
         <Answers
            key={answer.idAnswer}
             idAnswer={answer.idAnswer}
             answer={answer.answer}
             selectAnswer={answer.selectAnswer}
             ChangeColor={() => ChangeColor(answer.idAnswer, props.allQuestions.idQuestion)}
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