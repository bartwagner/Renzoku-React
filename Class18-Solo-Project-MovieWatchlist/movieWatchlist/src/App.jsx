import React from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import Movie from './Components/Movie'

function App() {

  const [watchlist, setWatchlist] = React.useState([])
  const [watchlistMy, setWatchlistMy] = React.useState([])
  const [findYourFilm, setFindYourFilm] = React.useState(false)
  const [messageError, setMessageError] = React.useState("")
  let randomLetter = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
  "ab","ac","ad","ae","af","ba","be","bi","bo","bu","bw","ca","ce","ci","co","cu","da","de","di","do","du",
  "fa","fe","fi","fo","fu","ga","ge","gi","go","gu","ha","he","hi","ho","hu","ja","je","ji","jo","ju","ka",
  "ke","ki","ko","ku","la","le","li","lo","lu","ma","me","mi","mo","mu","na","ne","ni","no","nu","pa","pe",
  "pi","po","pu","qu","ra","re","ri","ro","ru","sa","se","si","so","su","ta","te","ti","to","tu","va","ve",
  "vi","vo","vu","wa","we","wi","wo","wu","xa","xe","xi","xo","xu","za","ze","zi","zo","zu"]
  let movieSelect = ""


  async function resquestApi(quantity, random, search){
    let newList = []

    if(quantity > 0){
      for(let i = 0; i< quantity; i++){
        let letter = ""
        
        if(random == true){
          letter = randomMovies()
          randomLetter = randomLetter.filter((l) => l !== letter)
        }else{
          letter = search
        }

          const response = await fetch (`https://www.omdbapi.com/?apikey=aa1364b0&plot=full&t="${letter}"`)
          const data     = await response.json()
          
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
    }
  }

  function requestListMovies(){
    resquestApi(5, true, "")
  }

  function searchMovie(search){
    resquestApi(1, false, search)
  }

  function randomMovies(){
    return randomLetter[Math.floor(Math.random() * randomLetter.length)]
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

  return (
    <div className="App">
      <NavBar 
        searchMoviesButton={searchMoviesButton}
        myWatchlistButton={myWatchlistButton}
        searchMovie={searchMovie}
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
                    <img className="empty--add" src="./src/Images/addbutton.png" onClick={requestListMovies}/>
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
