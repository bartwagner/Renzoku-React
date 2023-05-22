import React from 'react'
import { inputSearchAuth } from './auth'

function NavBar(props) {

  const {inputSearchMovie, setInputSearchMovie} = inputSearchAuth()

  //get the Elements informations on the NavBar 
  var searchMovie = document.getElementById("textSearch");
  var searhDiv = document.getElementById("searchNav");
  var btnTextSearch = document.getElementById("lookNav");
  var titleNav = document.getElementById("titleNav");

  //case you don't have movies in your list, and you click on +Let’s add some movies!
  //ability like search after that ask my context 
  if(inputSearchMovie === true){
    btnTextSearch.innerHTML = "My Watchlist";
    titleNav.innerHTML = "Find your film";
    searhDiv.style.display = "flex";
    if (searchMovie != null){
      searchMovie.value =""
    }
    setInputSearchMovie(false)
  }

  //search movies
  function searchMovieButton(){
    props.resquestApiAll(searchMovie.value)
    searchMovie.value =""
  }

  //ability elements in the NavBar
  function searchingWatchlistData(){

    if (btnTextSearch.innerHTML === "Search for movies") {
      btnTextSearch.innerHTML = "My Watchlist";
      titleNav.innerHTML = "Find your film";
      searhDiv.style.display = "flex";
      if (searchMovie != null){
        searchMovie.value =""
      }
      props.changeStatusFindYourFilm();
    } else {
      btnTextSearch.innerHTML = "Search for movies";
      titleNav.innerHTML = "My Watchlist:";
      searhDiv.style.display = "none";
      props.changeStatusFindYourFilm();
    }
    
  }

  return (
    <div className="nav--bar">
        <h1 id="titleNav" className="title--nav">My Watchlist:</h1>
        <button id="lookNav" className="look--nav" onClick={searchingWatchlistData}>Search for movies</button>
        <div id="searchNav" className="search--nav">
          <input id="textSearch" type="text" className="text--search" placeholder="🔍 Searching something with no data"/>
          <button className="button--search" onClick={searchMovieButton}>Search</button>
        </div>
    </div>
  )
}

export default NavBar