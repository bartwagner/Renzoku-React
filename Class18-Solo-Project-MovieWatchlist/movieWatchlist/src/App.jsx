import React, { useEffect } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import Movie from './Components/Movie'
import { inputSearchAuth } from './Components/auth'

function App() {
  const {setInputSearchMovie} = inputSearchAuth()        //MyContext test
  const [watchlist, setWatchlist] = React.useState([])
  const [watchlistMy, setWatchlistMy] = React.useState([])
  const [findYourFilm, setFindYourFilm] = React.useState(false)
  const [messageError, setMessageError] = React.useState("")
  let movieSelect = ""

  //Check my localStorage
  useEffect(() => {
    const userStorage = localStorage.getItem('MyListMovies')
    if(userStorage){
      setWatchlistMy(JSON.parse(userStorage))
    }
    else{
      setWatchlistMy([])
    }
  }, [])

  //search the movies
  async function resquestApiAll(search){
    const responseFirst = await fetch (`https://www.omdbapi.com/?apikey=aa1364b0&plot=full&s="${search}"`)
    const dataFirst     = await responseFirst.json()
    if(dataFirst.Error){
      setMessageError(dataFirst.Error)
      setWatchlist([])
    }else{
      resquestApi(dataFirst.Search)
      setMessageError("")
    }
  }
  
  //get more details of the movies
  async function resquestApi(movie){
    let newList = []

    let movieFilter = filterResult(movie)

    for(let i = 0; i< movieFilter.length; i++){
      const response = await fetch (`https://www.omdbapi.com/?apikey=aa1364b0&plot=full&i=${movieFilter[i].imdbID}`)
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

  //Case in my results have movies in my list, the system make a filter 
  function filterResult(listIdMovies){ 
    let listFilter =  listIdMovies.filter(id => watchlistMy.findIndex(idMyList => idMyList.imdbID === id.imdbID) === -1)
    return listFilter
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
    newMovieLocalStorage(addListMovie)
    setWatchlistMy(addListMovie)
    setWatchlist(removeWatchList)
  }

  //remove my list
  function removeMovieMyList(title){
    const removeListMovie = watchlistMy.filter((movie) => movie.Title !== title)
    setWatchlistMy(removeListMovie)
    newMovieLocalStorage(removeListMovie)
  }

  //change the statusFindYourFilm like ability input or not, depends of whom ask
  function changeStatusFindYourFilm(){
    setFindYourFilm(!findYourFilm)
    setMessageError("")
  }

  //ability input in this case and change to true my input
  function searchingDataInput(){
    setFindYourFilm(!findYourFilm)
    setInputSearchMovie(true)
  }

  //update my list in the localStorage
  function newMovieLocalStorage(Movie){
    localStorage.setItem('MyListMovies', JSON.stringify(Movie))
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
        changeStatusFindYourFilm={changeStatusFindYourFilm}
        resquestApiAll={resquestApiAll}
        findYourFilm={findYourFilm}
      />
      {
        messageError != ''
        ?(
          <div className="error--result">{messageError}</div>
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
