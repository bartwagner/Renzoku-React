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
    <div className="Body">
        <button id="new-deck" onClick={props.requestIdDesk}>New Deck, Please!</button>
        {
          props.idDeckOk === true
          ?
          (
            <button id="draw-cards" onClick={props.requestTwoCards}>Draw</button>
          ):(
            <a>Click on the button above</a>
          )
        }
        {
          props.cardsImg != ""
          ?(
            <div>
              {showCards}
            </div>
          ):(
            <a>Click on the Draw</a>
          )
        }
    </div>
  )
}

export default Body