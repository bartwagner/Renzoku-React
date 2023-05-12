import React from 'react'

function Weather(props) {
    return(
        <div className='weather--icon--temp'>
            <div className='icon--temp'>
                <img src={props.icon} className='weather--icon'/>
                <p className='weather--temp'>{props.temperature}</p>
            </div>
            <p className='weather--city'>{props.city}</p>
        </div>
    )
}

export default Weather