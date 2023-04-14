import React from 'react'

function Body(props) {

    return (
      <div className="result">
          <h1 className="empty--watchlist">Your watchlist is looking a little empty...</h1>
          <div className="empty--div">
            <img className="empty--add" src="./src/Images/addbutton.png" onClick={props.requestListMovies}/>
            <h3 className="empty--add--letter">Let’s add some movies!</h3>
          </div>
      </div>
    )
  }
  
  export default Body