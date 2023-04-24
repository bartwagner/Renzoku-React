import React from 'react'

function Movie(props) {

  function readMoreFunction() {
    var dots = document.getElementById(`${props.plot.substr(5,10)}`);
    var moreText = document.getElementById(`${props.plot.substr(25,10)}`);
    var btnTextRead = document.getElementById(`${props.plot.substr(45,10)}`);

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnTextRead.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnTextRead.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }

  function addMovieList(){
    props.newMovieMyList(props.title)
  }

  function removeMovie(){
    props.removeMovieMyList(props.title)
  }

    return (
      <div>
      <div className='movie--information'>
        <img className="img--movie" src={props.poster}></img>
        <div className="movie--description">
          <div className="movie--body">
            <div className="movie--title">{props.title}</div>
            <img className="rating--star" src="./src/Images/star-yellow.png"/>
            <div className="movie--rating">{props.rating}</div>
          </div>
          <div className="movie--body">
            <div className="movie--runtime">{props.runtime}</div>
            <div className="movie--genre">{props.genre}</div>
            {
              props.findYourFilm == true
              ?
              (
                <div className="add--div" onClick={addMovieList}>
                  <img className="add--button" src="./src/Images/addbutton.png"/>
                  <h4 className="add--letter">Watchlist</h4>
                </div>
              )
              :
              (
                <div className="remove--div" onClick={removeMovie}>
                  <img className="remove--button" src="./src/Images/removebutton.png"/>
                  <h4 className="remove--letter">Remove</h4>
                </div>
              )
            }
          </div>
          <div className="movie--plot">
          {
            props.plot.length > 400
            ?
            (
              <div>
                {props.plot.substr(0,400)}<span id={props.plot.substr(5,10)}>...</span>  {/*change ids by nanoid*/}
                                          <span id={props.plot.substr(25,10)} className="more--read">{props.plot.substr(400, props.plot.length)}</span>
                                          <button id={props.plot.substr(45,10)} className="read--button" onClick={readMoreFunction}>Read more</button>
              </div>
            )
            :
            (
              <div>
              {props.plot}
              </div>
            )

          }
          </div>
        </div>
      </div>
      <hr className="movie--bar" size="1" width="80%" />
      </div>
    )
  }
  
  export default Movie