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
  const [winnerResult,setWinnerResult] = React.useState()

  function requestIdDesk(){
    startingTheVariables()
    fetch ("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then (response => response.json())
    .then (data => {
      setIdDeck(data.deck_id)
      setIdDeckButtonDisabled(false)
      setCountCards(data.remaining)
    })
    .catch([])
  }

  function requestTwoCards(){
    if(countCards != 0){
      fetch (`https://apis.scrimba.com/deckofcards/api/deck/${idDeck}/draw/?count=2`)
      .then (response => response.json())
      .then (data => {
        setCountCards(data.remaining)
        setCardsCharger(data.cards)
        setWinnerResult(checkWinner(data.cards[0].value, data.cards[1].value))
      })
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
    }else{
      return "Computer Won the Game!!!"
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

  // const people = [
  //   { name: "Jack", hasPet: true },
  //   { name: "Jill", hasPet: false },
  //   { name: "Alice", hasPet: true },
  //   { name: "Bob", hasPet: false },
  // ]

  // function filterArray(array, callback) {
  //   const resultingArray = []
  //   // Write your filtering logic here
  //   for(let item of array){
  //     const shouldBeIncluded = callback(item)
  //     if(shouldBeIncluded){
  //       resultingArray.push(item)
  //     }
  //   }
  //   return resultingArray
  // }

  // const peopleWithPets = filterArray(people, function(person) {
  //   return person.hasPet
  // })

  // console.log(peopleWithPets)


  // function callback(){
  //   window.console.log("I finally ran!")
  // }

  // setTimeout(callback, 2000)


  // function gimmeThePets(person) {
  //   return person.hasPet
  // }
  // //const peopleWithPets = people.filter(gimmeThePets)


  // window.console.log(peopleWithPets)

export default App