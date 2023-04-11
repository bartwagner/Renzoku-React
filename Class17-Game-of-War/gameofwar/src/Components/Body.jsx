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
    <div className='div--result'>
        <h3 className="result--slot">Remaining Cards: {props.countCards}</h3>
        <h2 className="result--slot">{props.winnerResult}</h2>
        <h2 className="result--slot" id="header">Game of War</h2>
        <h3 className="result--slot" id="computer-score">Computer score: {props.computerWin}</h3>
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
        <h3 className="result--slot" id="my-score">My Score: {props.personWin}</h3>
    </div>
  )
}

export default Body