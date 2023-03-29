import React from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Body from './components/Body'
import {nanoid} from 'nanoid'

function App() {

  const [colorGroup, setColorGroup] = React.useState([])

  async function returnColors(color, mode){
    color = color.slice(1);

    const options = {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      }
    };
    
    try {
      const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`, options);
    
      if (!response.ok) {
        const message = 'Error with Status Code: ' + response.status;
        throw new Error(message);
      }
    
      const data = await response.json();
      setColorGroup(data.colors)
    } catch (error) {
      const message = 'Error: ' + err;
      throw new Error(message);
    }
  }

  const putColorGroup = colorGroup.map(c => (
    <Body
      key={nanoid()}
      value={c.hex.value}
    /> 
    ))

  return (
    <div>
      <NavBar
        returnColors={returnColors}
      />
      {putColorGroup}
    </div>
  )
}

export default App
