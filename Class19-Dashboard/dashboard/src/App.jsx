import React from 'react'
import './App.css'

function App() {

  React.useEffect(()=>{
    resquestApiBackground()
  }, [])

  async function resquestApiBackground(){
    const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const data     = await response.json()
    document.getElementById('body').style.backgroundImage = `url('${data.urls.full}')`;
  }


  return (
    <div>
      aa
    </div>
  )
}

export default App