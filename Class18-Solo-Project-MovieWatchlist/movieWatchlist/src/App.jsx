import React from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import Body from './Components/Body'

function App() {

  const [watchlist, setWatchlist] = React.useState([])

  async function requestListMovies(){
    const responde = await fetch ("https://www.omdbapi.com/?i=tt3896198&apikey=aa1364b0&page=5")
    const data     = await responde.json()
      setWatchlist(data)
      window.console.log(data)
  }


  return (
    <div className="App">
      <NavBar />
      <Body 
        requestListMovies={requestListMovies}
      />
    </div>
  )
}

export default App
