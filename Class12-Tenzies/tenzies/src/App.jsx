import React from 'react'
import './App.css'
import Die from'./Components/Die'

export default function App() {
  const [arrayNumbers, setArrayNumbers] = React.useState(allNewDice())
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(Math.ceil(Math.random() * 6))
      }
      return newDice
  }
  
  const dieElements = arrayNumbers.map(die => <Die value={die} />)

  function rollDice() {
    setArrayNumbers(allNewDice())
  }

  return (
      <main>
          <div className="dice-container">
              {dieElements}
          </div>
          <button className="roll--button" onClick={rollDice}>Roll</button>
      </main>
  )
        //<button className="roll--button" onClick={() => setArrayNumbers(allNewDice)}>Roll</button>
}