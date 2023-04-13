import React from 'react'

function Body() {

    return (
      <div className="result">
          <h1 className="empty--watchlist">Your watchlist is looking a little empty...</h1>
          <div className="empty--div">
            <img className="empty--add" src="Images/navbar.jpg" />
            <h3 className="empty--watchlist">Let’s add some movies!</h3>
          </div>
      </div>
    )
  }
  
  export default Body