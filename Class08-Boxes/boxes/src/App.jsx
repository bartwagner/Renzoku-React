import React, {useState} from 'react'
import './App.css'
import boxes from './boxes'
import Box from './Box'

function App() {
  const [squares, setSquares] = React.useState(boxes)
    
  function toggle(id) {
      setSquares(prevSquares => {
          return prevSquares.map((square) => {
              return square.id === id ? {...square, on: !square.on} : square
          })
      })
  }
  //or different way 
  //function toggle(id) {
  //    const newSquares = []
  //    setSquares(prevSquares => {
  //        for(let i = 0; i < prevSquares.length; i++) { 
  //            if(prevSquares[i].id === id) {
  //                const updateSquares = {
  //                    ...prevSquares[i],
  //                    on: !prevSquares[i].on
  //                }
  //                newSquares.push(updateSquares)
  //            }else{
  //                newSquares.push(prevSquares[i])
  //            }
  //        }
  //        return newSquares
  //    })
  //}
  
  const squareElements = squares.map(square => (
      <Box 
          key={square.id} 
          on={square.on} 
          toggle={() => toggle(square.id)}
      />
  ))
  
  return (
      <main>
          {squareElements}
      </main>
  )
}

export default App
