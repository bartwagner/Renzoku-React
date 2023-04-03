import React from 'react'

function Body(props) {
  return (
    <div className="Body">
        <button onClick={props.requestDesk}>New Deck, Please!</button>
    </div>
  )
}

export default Body