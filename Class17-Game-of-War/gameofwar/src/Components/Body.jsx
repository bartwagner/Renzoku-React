import React from 'react'
import Cards from './Cards'

function Body(props) {

  let showCards = ""

  if(props.cardsCharger != ""){
    showCards = props.cardsCharger.map(c => (
        <Cards
            key={c.code}
            card={c.image}
        />
      ))
  }

  return (
    <div>
        <h2 className="result--slot">{props.winnerResult}</h2>
        <h2 className="result--slot">Computer: {props.computerWin}</h2>
        {
            props.cardsCharger != ""
            ?(
                <div id="cards" className='cards'>
                    {showCards}
                </div>
            ):
            (
                <div id="cards" className='cards'>
                    <div className="card--slot"/>
                    <div className="card--slot"/>
                </div>
            )
        }
        <h2 className="result--slot">Me: {props.personWin}</h2>
    </div>
  )
}

export default Body