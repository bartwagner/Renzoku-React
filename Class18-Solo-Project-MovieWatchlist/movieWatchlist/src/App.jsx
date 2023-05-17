import React from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import Movie from './Components/Movie'

function App() {

  const [watchlist, setWatchlist] = React.useState([])
  const [watchlistMy, setWatchlistMy] = React.useState([])
  const [findYourFilm, setFindYourFilm] = React.useState(false)
  const [messageError, setMessageError] = React.useState("")
  const[inputSearch, setInputSearch] = React.useState(false)
  const[allResults, setAllResults] = React.useState([])

  let movieSelect = ""


  async function resquestApiAll(search){
    const responseFirst = await fetch (`https://www.omdbapi.com/?apikey=aa1364b0&plot=full&s="${search}"`)
    const dataFirst     = await responseFirst.json()
    if(dataFirst.Error){
      setMessageError(dataFirst.Error)
    }else{
      setAllResults(dataFirst)
      setMessageError("")
    }
  }
  
  async function resquestApi(){
    let newList = []

    window.console.log(allResults)

    for(let i = 0; i< allResults.Search.length; i++){
      const response = await fetch (`https://www.omdbapi.com/?apikey=aa1364b0&plot=full&i=${allResults.Search[i].imdbID}`)
      const data     = await response.json()

      window.console.log(data)

      if(data.Error){
        setMessageError(data.Error)
      }else{
        newList.push(data)
        setMessageError("")
      }
    }
    if (findYourFilm == true){
      setWatchlist(newList)
    }else{
      setWatchlistMy(newList)
    }
    window.console.log(newList)
  }

  function searchMovie(search){
    resquestApiAll(search)
    loadApp()
    resquestApi()
  }

  function searchMoviesButton(){
    setWatchlist([])
    setFindYourFilm(!findYourFilm)
    resquestApi(0, false, "")
  }

  function myWatchlistButton(){
    setFindYourFilm(!findYourFilm)
    setMessageError("")
  }

  function newMovieMyList(title){
    let addListMovie = []

    for(let i = 0; i < watchlistMy.length; i++){
      addListMovie.push(watchlistMy[i])
    }

    for(let i = 0; i < watchlist.length; i++){
      if(watchlist[i].Title == title){
        addListMovie.push(watchlist[i])
      }
    }
    setWatchlistMy(addListMovie)
    setWatchlist([])
  }

  function removeMovieMyList(title){
    const removeListMovie = watchlistMy.filter((movie) => movie.Title !== title)

    setWatchlistMy(removeListMovie)
  }


  function abilityMovies(){
    setFindYourFilm(!findYourFilm)
    searchingDataInput()
  }

  function searchingDataInput(){
    setInputSearch(true)
  }

  if (findYourFilm == true){
    movieSelect = watchlist.map(w => (     
      
      <Movie
        key={w.imdbID}
        poster={w.Poster}
        title={w.Title}
        rating={w.imdbRating}
        runtime={w.Runtime}
        genre={w.Genre}
        plot={w.Plot}
        findYourFilm={findYourFilm}
        newMovieMyList={newMovieMyList}
      />
    ))
  }else{
    movieSelect = watchlistMy.map(w => (
      <Movie
        key={w.imdbID}
        poster={w.Poster}
        title={w.Title}
        rating={w.imdbRating}
        runtime={w.Runtime}
        genre={w.Genre}
        plot={w.Plot}
        findYourFilm={findYourFilm}
        removeMovieMyList={removeMovieMyList}
      />
    ))
  }

  function loadApp(){
    if (!allResults.Search){
      return(
        <div className="App">
          <NavBar 
            searchMoviesButton={searchMoviesButton}
            myWatchlistButton={myWatchlistButton}
            searchMovie={searchMovie}
            inputSearch={inputSearch}
          />
          <div className="c--loader"/>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <NavBar 
        searchMoviesButton={searchMoviesButton}
        myWatchlistButton={myWatchlistButton}
        searchMovie={searchMovie}
        inputSearch={inputSearch}
      />
      {
        messageError != ""
        ?(
          <div className='movie--unavailable'>Unable to find what you’re looking for. Please try another search.</div>
        )
        :
        (
          (watchlist =="" && watchlistMy =="") || (watchlist =="" && findYourFilm == true)
          ?(
            findYourFilm == true
            ?(
              <div className="search--explorer">
                <img className="start--explorer" src="./src/Images/Icon.png" />
                <h2 className="explorer--word">start exploring</h2>
              </div>
              ):(
                <div className="result">
                  <h1 className="empty--watchlist">Your watchlist is looking a little empty...</h1>
                  <div className="empty--div">
                    <img className="empty--add" src="./src/Images/addbutton.png" onClick={abilityMovies}/>
                    <h3 className="empty--add--letter">Let’s add some movies!</h3>
                  </div>
                </div>
              )
          ):
          (
              <div>
                {movieSelect}
              </div>
          )
        )
      }
    </div>
  )
}

export default App
