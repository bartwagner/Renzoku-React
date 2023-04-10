import React from 'react'
import './App.css'
import Body from './Components/Body'

var computerWin = 0
var personWin = 0

function App() {
  const [idDeck,setIdDeck] = React.useState("")
  const [idDeckButtonDisabled,setIdDeckButtonDisabled] = React.useState(true)
  const [cardsCharger,setCardsCharger] = React.useState([])
  let winnerResult = "--"

  function requestIdDesk(){
    setCardsCharger("")
    fetch ("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then (response => response.json())
    .then (data => {
      setIdDeck(data.deck_id)
      setIdDeckButtonDisabled(false)
    })
    .catch([])
  }

  function requestTwoCards(){
    fetch (`https://apis.scrimba.com/deckofcards/api/deck/${idDeck}/draw/?count=2`)
    .then (response => response.json())
    .then (data => {
      setCardsCharger(data.cards)
      setIdDeckButtonDisabled(true)
    })
  }

  if(cardsCharger != ""){
    winnerResult = checkWinner(cardsCharger[0].value, cardsCharger[1].value)
  }
  
  function checkWinner(cardOne, cardSecond){
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    let cardWinner = ""
    const card1ValueIndex = valueOptions.indexOf(cardOne)
    const card2ValueIndex = valueOptions.indexOf(cardSecond)

    if(card1ValueIndex > card2ValueIndex){
      cardWinner ="Computer Win"
    }else if(card1ValueIndex < card2ValueIndex){
      cardWinner ="You Win"
    }else{
      cardWinner = "War!"
    }

    return cardWinner
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