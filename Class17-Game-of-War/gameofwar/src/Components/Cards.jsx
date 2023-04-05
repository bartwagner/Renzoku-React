import React from 'react'

function Cards(props) {

  return (
    <div className="Cards">
        <img src={props.card}/>
    </div>
  )
}

export default Cards