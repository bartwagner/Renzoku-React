import React from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import Movie from './Components/Movie'

function App() {

  const [watchlist, setWatchlist] = React.useState([])
  const [watchlistMy, setWatchlistMy] = React.useState([])
  const [findYourFilm, setFindYourFilm] = React.useState(false)
  const randomLetter = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
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
        }else{
          letter = search
        }
        const responde = await fetch (`https://www.omdbapi.com/?apikey=aa1364b0&plot=full&t="${letter}"`)
        const data     = await responde.json()
        newList.push(data)
      }
      if (findYourFilm == true){
        setWatchlist(newList)
      }else{
        window.console.log(newList)
        setWatchlistMy(newList)
      }
    }
  }

  function requestListMovies(){
    resquestApi(3, true, "")
  }

  function searchMovie(search){
    resquestApi(1, false, search)
  }

  function randomMovies(){
    return randomLetter[Math.floor(Math.random() * randomLetter.length)]
  }

  function searchMoviesButton(){
    setFindYourFilm(!findYourFilm)
    resquestApi(0, false, "")
  }

  function myWatchlistButton(){
    setFindYourFilm(!findYourFilm)
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
      }
    </div>
  )
}

export default App
