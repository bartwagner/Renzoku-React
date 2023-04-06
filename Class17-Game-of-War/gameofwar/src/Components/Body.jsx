import React from 'react'
import Cards from './Cards'

function Body(props) {

  let showCards = ""

  if(props.cardsImg != ""){

    showCards = props.cardsImg.map(c => (
      <Cards
        key={c.code}
        card={c.image}
      />
    ))
  }
  
  
  return (
    <div className="body">
        <button id="newDeck" className="new--deck" onClick={props.requestIdDesk}>New Deck</button>
        {
          props.cardsImg != ""
          ?
          ( 
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
        <button id="draw-cards" onClick={props.requestTwoCards} className="draw" disabled={props.idDeckButtonDisabled}>Draw</button>
    </div>
  )
}

export default Body