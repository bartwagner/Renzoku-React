import React from 'react'
import './App.css'
import Body from './Components/Body'

function App() {
  const [idDeck,setIdDeck] = React.useState("")
  const [idDeckButtonDisabled,setIdDeckButtonDisabled] = React.useState(true)
  const [cardsCharger,setCardsCharger] = React.useState([])

  const [computerWin,setComputerWin] = React.useState(0)
  const [personWin,setPersonWin] = React.useState(0)
  // let whoWin = ""

  const options = {
    method: 'get',
    headers: {
      "Content-Type": "application/json"
    }
  };

  async function requestIdDesk(){
    setCardsCharger("")
    await fetch ("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/", options)
    .then (response => response.json())
    .then (data => {
      setIdDeck(data.deck_id)
      setIdDeckButtonDisabled(false)
    })
    .catch([])
  }

  async function requestTwoCards(){
    await fetch (`https://apis.scrimba.com/deckofcards/api/deck/${idDeck}/draw/?count=2`, options)
    .then (response => response.json())
    .then (data => {
      setCardsCharger(data.cards)
      setIdDeckButtonDisabled(true)
    })
  }

  return (
    <div className="app">
      <Body
        requestIdDesk={requestIdDesk}
        requestTwoCards={requestTwoCards}
        idDeckButtonDisabled={idDeckButtonDisabled}
        cardsCharger={cardsCharger}
      />
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