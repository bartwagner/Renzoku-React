import React from 'react'
import './App.css'
import Body from './Components/Body'

function App() {
  const [idDeck,setIdDeck] = React.useState("")
  const [idDeckOk,setIdDeckOk] = React.useState(false)
  const [cardsImg,setCardsImg] = React.useState([])

  const options = {
    method: 'get',
    headers: {
      "Content-Type": "application/json"
    }
  };

  async function requestIdDesk(){

    await fetch ("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/", options)
    .then (response => response.json())
    .then (data => {
      setIdDeck(data.deck_id)
      setIdDeckOk(true)
    })
    .catch([])
  }
  
  async function requestTwoCards(){
    await fetch (`https://apis.scrimba.com/deckofcards/api/deck/${idDeck}/draw/?count=2`, options)
    .then (response => response.json())
    .then (data => {
      setCardsImg(data.cards)
      setIdDeckOk(false)
    })
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

  return (
    <div className="App">
      <Body
        requestIdDesk={requestIdDesk}
        requestTwoCards={requestTwoCards}
        idDeckOk={idDeckOk}
        cardsImg={cardsImg}
      />
    </div>
  )
}

export default App