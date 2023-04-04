import React from 'react'

function Body(props) {
  return (
    <div className="Body">
        <button id="new-deck" onClick={props.requestDesk}>New Deck, Please!</button>
    </div>
  )
}

export default Body