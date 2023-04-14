import React from 'react'

function Movie(props) {

  window.console.log(props)

    return (
      <div>
        {props.poster}
        {props.title}
        <img className="rating--star" src="./src/Images/star-yellow.png"/>
        {props.rating}
        <br />
        {props.runtime}
        {props.genre}
        <img className="remove--button" src="./src/Images/removebutton.png"/>
        <h4 className="remove--letter">Remove</h4>
        {props.plot}
      </div>
    )
  }
  
  export default Movie