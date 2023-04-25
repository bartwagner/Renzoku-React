import React from 'react'
import './App.css'
import Body from './Components/Body'

function App() {
  
  const [dataInfor, setDataInfor] = React.useState([])

  React.useEffect(()=> {
    async function resquestApiBackground() {
      const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
      const data     = await response.json()
      setDataInfor(data)
      document.body.style.backgroundImage = `url(${data.urls.full})`
      window.console.log(data)
    }
    resquestApiBackground()
  }, [])

  const bodyInput = (
    <Body
      key={dataInfor.id}
      author={dataInfor.user.name}
    />
  )

  return (
    <div>
      {bodyInput}
    </div>
  )
}

export default App