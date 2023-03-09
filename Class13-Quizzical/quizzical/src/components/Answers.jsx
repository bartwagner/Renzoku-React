import React from 'react'

export default function Answers(props){
    //window.console.log(props)

    const styles = {
      backgroundColor: props.selectQuestion ? "#D6DBF5": "#E5E5E5"
    }
//style={styles}
    return(
        <div>
            <div className='answer--div' id={props.idAnswer}>
              <h2>{props.answer}</h2>            
            </div>
        </div>
    )
}