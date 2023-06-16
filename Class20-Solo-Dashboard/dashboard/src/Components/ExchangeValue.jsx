import React from 'react'

function ExchangeValue(props) {

    ///////////////////////
    // Return the values //
    ///////////////////////
    return(
        <div className='exchange--currency'>
            <p>{props.currency}</p>
            <p>{props.value}</p>
        </div>
    )
}

export default ExchangeValue