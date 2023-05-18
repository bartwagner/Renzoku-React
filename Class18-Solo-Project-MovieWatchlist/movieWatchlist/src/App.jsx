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

  let movieSelect = ""

  //search the movies
  async function resquestApiAll(search){
    const responseFirst = await fetch (`https://www.omdbapi.com/?apikey=aa1364b0&plot=full&s="${search}"`)
    const dataFirst     = await responseFirst.json()
    if(dataFirst.Error){
      resquestApi(dataFirst.Error)
    }else{
      resquestApi(dataFirst)
      setMessageError("")
    }
  }
  
  //get more details of the movies
  async function resquestApi(movie){
    let newList = []

    for(let i = 0; i< movie.Search.length; i++){
      const response = await fetch (`https://www.omdbapi.com/?apikey=aa1364b0&plot=full&i=${movie.Search[i].imdbID}`)
      const data     = await response.json()

      if(data.Error){
        setMessageError(data.Error)
      }else{
        newList.push(data)
        setMessageError("")
      }
    }
    setWatchlist(newList)
    setFindYourFilm(true)
  }

  //Add my list
  function newMovieMyList(title){
    let addListMovie = []
    let removeWatchList = []
    addListMovie = [].concat(watchlistMy)

    for(let i = 0; i < watchlist.length; i++){
      if(watchlist[i].Title == title){
        addListMovie.push(watchlist[i])
        removeWatchList = watchlist.filter((movie) => movie.Title !== title)
      }
    }
    setWatchlistMy(addListMovie)
    setWatchlist(removeWatchList)
  }

  //remove my list
  function removeMovieMyList(title){
    const removeListMovie = watchlistMy.filter((movie) => movie.Title !== title)
    setWatchlistMy(removeListMovie)
  }

  function searchMoviesButton(){
    setWatchlist([])
    setFindYourFilm(!findYourFilm)
  }

  function myWatchlistButton(){
    setFindYourFilm(!findYourFilm)
    setMessageError("")
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
        messageError={messageError}
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

  return (
    <div className="App">
      <NavBar
        searchMoviesButton={searchMoviesButton}
        myWatchlistButton={myWatchlistButton}
        resquestApiAll={resquestApiAll}
        inputSearch={inputSearch}
      />
      {
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
                    <img className="empty--add" src="./src/Images/addbutton.png" onClick={searchingDataInput}/>
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
