import React from 'react'

function Movie(props) {

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less"; 
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
                {props.plot.substr(0,400)}<span id='dots'>... </span>
                                          <span id="more" className="moreRead">{props.plot.substr(400, props.plot.length)} </span>
                                          <button onClick={myFunction} id="myBtn">Read more</button>
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