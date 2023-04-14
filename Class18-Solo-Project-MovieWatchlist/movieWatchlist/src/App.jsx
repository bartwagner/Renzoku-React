import React from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import Movie from './Components/Movie'

function App() {

  const [watchlist, setWatchlist] = React.useState([])
  let movieSelect = ""

  async function requestListMovies(){
    const responde = await fetch ("https://www.omdbapi.com/?i=tt3896198&apikey=aa1364b0&page=5")
    const data     = await responde.json()
      setWatchlist(data)
      window.console.log(data)
  }

  // if(watchlist !=""){
  //   movieSelect = watchlist.map(w => (
  //     <Movie
  //       Title={watchlist.Title}
  //       Rating={watchlist.Title}
  //     />
  //   ))
  // }

  return (
    <div className="App">
      <NavBar />
      {
        watchlist ==""
        ?(
          <div className="result">
            <h1 className="empty--watchlist">Your watchlist is looking a little empty...</h1>
            <div className="empty--div">
              <img className="empty--add" src="./src/Images/addbutton.png" onClick={requestListMovies}/>
              <h3 className="empty--add--letter">Let’s add some movies!</h3>
            </div>
          </div>
        ):
        (
          <Movie
            poster={watchlist.Poster}
            title={watchlist.Title}
            rating={watchlist.imdbRating}
            runtime={watchlist.Runtime}
            genre={watchlist.Genre}
            plot={watchlist.Plot}
          />
          // {movieSelect}
        )
      }
    </div>
  )
}

export default App
