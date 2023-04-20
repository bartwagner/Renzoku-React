import React from 'react'

function NavBar(props) {

function searchMovieButton(){
  var searchMovie = document.getElementById("textSearch").value;
  props.searchMovie(searchMovie)
}

function searchingData(){

  var btnTextSearch = document.getElementById("lookNav");
  var searhDiv = document.getElementById("searchNav");
  var titleNav = document.getElementById("titleNav");

  if (btnTextSearch.innerHTML === "Search for movies") {
    btnTextSearch.innerHTML = "My Watchlist";
    titleNav.innerHTML = "Find your film";
    searhDiv.style.display = "flex";
    props.searchMoviesButton();
  } else {
    btnTextSearch.innerHTML = "Search for movies";
    titleNav.innerHTML = "My Watchlist:";
    searhDiv.style.display = "none";
    props.myWatchlistButton();
  }
  
}

  return (
    <div className="nav--bar">
        <h1 id="titleNav" className="title--nav">My Watchlist:</h1>
        <button id="lookNav" className="look--nav" onClick={searchingData}>Search for movies</button>
        <div id="searchNav" className="search--nav">
          <input id="textSearch" type="text" className="text--search" placeholder="🔍 Searching something with no data"/>
          <button className="button--search" onClick={searchMovieButton}>Search</button>
        </div>
    </div>
  )
}

export default NavBar