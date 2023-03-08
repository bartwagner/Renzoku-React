import React from 'react'

export default function Answers(props){
    window.console.log(props)

    return(
        <div>
            <button button='answers' className='answer--botton'>{props.Answer}</button>
        </div>
    )
}