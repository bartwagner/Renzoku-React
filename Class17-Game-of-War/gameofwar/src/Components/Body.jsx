import React from 'react'
import Cards from './Cards'

function Body(props) {

  let showCards = ""

  if(props.cardsCharger != ""){

    checkWinner(props.cardsCharger[0].value, props.cardsCharger[1].value)

    function checkWinner(cardOne, cardSecond){
      const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
      "10", "JACK", "QUEEN", "KING", "ACE"]
  
      // const card1ValueIndex = valueOptions.indexOf(cardOne)
      // const card2ValueIndex = valueOptions.indexOf(cardSecond)
  
      window.console.log("vai caralho")
  
      // if(card1ValueIndex > card2ValueIndex){
      //   // setComputerWin(computerWin + 1)
      //   window.console.log("Computer Win")
      //   // whoWin = "Conputer Win"
      // }else if(card1ValueIndex < card2ValueIndex){
      //   // setPersonWin(personWin + 1)
      //   window.console.log("You Win")
      //   // whoWin = "You Win"
      // }else{
      //   // whoWin = "It's a tie!"
      //   window.console.log("It's a tie!")
      // }
    }
    
    showCards = props.cardsCharger.map(c => (
      <Cards
        key={c.code}
        card={c.image}
      />
    ))
  }
  
  
  return (
    <div className="body">
        <button id="newDeck" className="new--deck" onClick={props.requestIdDesk}>New Deck</button>
        {/* <h2>{whoWin}</h2> */}
        {/* <h2>Computer: {props.computerWin}</h2> */}
        {
          props.cardsCharger != ""
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
        {/* <h2>Me: {personWin}</h2> */}
        <button id="draw-cards" onClick={props.requestTwoCards} className="draw" disabled={props.idDeckButtonDisabled}>Draw</button>
    </div>
  )
}

export default Body