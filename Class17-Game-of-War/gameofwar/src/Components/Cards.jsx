import React from 'react'

function Cards(props) {

  return (
    <div className="cards">
        <img src={props.card} className="card--slot"/>
    </div>
  )
}

export default Cards