import React from 'react'

export default function Answers(props){
    //window.console.log(props)

    const styles = {
      backgroundColor: props.selectAnswer ? "#D6DBF5": "#E5E5E5"
    }
    return(
        <div>
            <div className='answer--div' id={props.idAnswer} style={styles} onClick={props.ChangeColor}>
              <h2>{props.answer}</h2>            
            </div>
        </div>
    )
}