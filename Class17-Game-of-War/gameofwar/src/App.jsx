import React from 'react'
import './App.css'
import Body from './Components/Body'

let personWin = 0
let computerWin = 0

function App() {
  const [idDeck,setIdDeck] = React.useState("")
  const [idDeckButtonDisabled,setIdDeckButtonDisabled] = React.useState(true)
  const [countCards,setCountCards] = React.useState()
  const [cardsCharger,setCardsCharger] = React.useState([])
  const [winnerResult,setWinnerResult] = React.useState("--")

  async function requestIdDesk(){
    startingTheVariables()
    const responde = await fetch ("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data     = await responde.json()
      setIdDeck(data.deck_id)
      setIdDeckButtonDisabled(false)
      setCountCards(data.remaining)
  }

  async function requestTwoCards(){
    if(countCards != 0){
      const responde = await fetch (`https://apis.scrimba.com/deckofcards/api/deck/${idDeck}/draw/?count=2`)
      const data     = await responde.json()
        setCountCards(data.remaining)
        setCardsCharger(data.cards)
        setWinnerResult(checkWinner(data.cards[0].value, data.cards[1].value))
    }else{
      setIdDeckButtonDisabled(true)
      setWinnerResult(finalWinner(personWin, computerWin))
    }
  }

function startingTheVariables(){
  personWin = 0
  computerWin = 0
  setWinnerResult("--")
  setCardsCharger([])
}

  function checkWinner(cardOne, cardSecond){
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    const card1ValueIndex = valueOptions.indexOf(cardOne)
    const card2ValueIndex = valueOptions.indexOf(cardSecond)

    if(card1ValueIndex > card2ValueIndex){
      computerWin++
      return "Computer Win"
    }else if(card1ValueIndex < card2ValueIndex){
      personWin++
      return "You Win"
    }else{
      return "War!"
    }
  }

  function finalWinner (personScore, computerScore){
    if(personScore > computerScore){
      return "You Won the Game!!!"
    }else if (personScore < computerScore){
      return "Computer Won the Game!!!"
    }else{
      return "The game was a draw. Do you like to try again?"
    }
  }

  return (
    <div className="app">
        <button id="newDeck" className="new--deck" onClick={requestIdDesk}>New Deck</button>
        { 
          <Body 
            winnerResult={winnerResult}
            computerWin={computerWin}
            personWin={personWin}
            cardsCharger={cardsCharger}
            countCards={countCards}
          />
        }
        <button id="draw-cards" onClick={requestTwoCards} className="draw" disabled={idDeckButtonDisabled}>Draw</button>
    </div>
  )
}

export default App