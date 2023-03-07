import React from 'react'

export default function Questions(props){
    window.console.log(props)
    return(
        <div>
            <h1>{props.allQuestions.question}</h1>
        </div>
    )
}