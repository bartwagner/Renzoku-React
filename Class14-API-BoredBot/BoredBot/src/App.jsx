import { useState } from 'react'
import './App.css'

function App() {

  function idea(){
    fetch("https://apis.scrimba.com/bored/api/activity")
        .then(response => response.json())
        .then(data => {
            document.getElementById("activity--name").textContent = data.activity
            document.getElementById("title").textContent = "🦾 HappyBot🦿"
            document.body.classList.add("fun")
        })
   }

  return (
    <div>
        <h1 id="title">🤖 BoredBot 🤖</h1>
        <h4 id="activity--name">Find something to do</h4>
        <button onClick={idea}></button>
    </div>
  )
}

export default App
