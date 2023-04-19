import React from 'react'

function Movie(props) {

function readMoreFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnTextRead = document.getElementById("buttonRead");

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
            <img className="remove--button" src="./src/Images/removebutton.png"/>
            <h4 className="remove--letter">Remove</h4>
          </div>
          <div className="movie--plot">
          {
            props.plot.length > 400
            ?
            (
              <div>
                {props.plot.substr(0,400)}<span id='dots'>...</span>
                                          <span id="more" className="more--read">{props.plot.substr(400, props.plot.length)}</span>
                                          <button id="buttonRead" className="read--button" onClick={readMoreFunction}>Read more</button>
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