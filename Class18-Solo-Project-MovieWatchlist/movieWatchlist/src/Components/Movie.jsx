import React from 'react'

function Movie(props) {

  window.console.log(props)

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
          <div className="movie--plot">{props.plot}</div>
        </div>
      </div>
      <hr className="movie--bar" size="1" width="80%" />
      </div>
    )
  }
  
  export default Movie