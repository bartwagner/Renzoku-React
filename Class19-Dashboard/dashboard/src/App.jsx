import React from 'react'
import './App.css'
import Body from './Components/Body'

function App() {
  
  const [dataInfor, setDataInfor] = React.useState()

  React.useEffect(()=> {
    async function resquestApiBackground() {
      const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
      const data     = await response.json()
      setDataInfor()
    }
    resquestApiBackground(data)
  }, [])

  if (!dataInfor){
    return (
      <div class="c-loader"/>
    )
  }

  document.body.style.backgroundImage = `url(${dataInfor.urls.full})`
  return (
    <div>
      <Body
        key={dataInfor.id}
        author={dataInfor.user.name}
      />
    </div>
  )
}

export default App