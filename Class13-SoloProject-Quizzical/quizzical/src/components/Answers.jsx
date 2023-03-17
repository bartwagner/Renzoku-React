import React from 'react'

export default function Answers(props){

  /*--------------------------------------------------------------------------------------------
  --------------------------This style shows which questions are right--------------------------
  --------------------------------------------------------------------------------------------*/
  const styles = {
    backgroundColor: 
      props.checkCorrectAnswerButton === true && props.selectAnswer === true && props.selectAnswerCorrect === true? "#94D7A2"
          : props.checkCorrectAnswerButton === true && props.selectAnswer === false && props.selectAnswerCorrect === true? "#94D7A2"
            : props.checkCorrectAnswerButton === true && props.selectAnswer === true && props.selectAnswerCorrect === false? "#F8BCBC"
      : props.checkCorrectAnswerButton === false && props.selectAnswer ? "#D6DBF5": "#E5E5E5"
  }

  return(
    <div>
      <div className='answer--div' id={props.idAnswer} style={styles} onClick={props.changeColor}>
        <h2>{props.answer}</h2>            
      </div>
    </div>
    )
}