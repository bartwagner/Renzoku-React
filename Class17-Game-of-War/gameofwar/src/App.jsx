import React from 'react'
import './App.css'
import Body from './Components/Body'

function App() {

  async function requestDesk(){
    
    const options = {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      }
    };

    await fetch ("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/", options)
    .then (res => res.json())
    .then (data => window.console.log(data))
    .catch([])
  }

  function callback(){
    window.console.log("I finally ran!")
  }

  setTimeout(callback, 2000)
  

  return (
    <div className="App">
      <Body
        requestDesk={requestDesk}
      />
    </div>
  )
}

export default App