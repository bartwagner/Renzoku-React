import React from 'react'
import Answers from './Answers'
import {nanoid} from "nanoid"

export default function Questions(props){
    let loadAllAnswer = props.allQuestions.answers

    const askAllAnswer = loadAllAnswer.map(loadAllAnswer =>(
        <Answers
            key={nanoid()}
            Answer={loadAllAnswer}
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