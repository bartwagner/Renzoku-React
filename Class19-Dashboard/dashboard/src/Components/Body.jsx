import React from 'react'
import moment from 'moment'

function Body(props) {    

return(
    <main className='main'>
        <div className="top--website">
            <div className='crypto--Website'>
                <div className='crypto--name'>
                    <img className='crypto--simbol' src={props.cryptoImg} />
                    <p className='crypto--value'>{props.nameCurrency}</p>
                </div>
                <div>
                    <p className='crypto--value'>🎯: {props.cryptoPrice}</p>
                    <p className='crypto--value'>👆: {props.cryptoHigh}</p>
                    <p className='crypto--value'>👇: {props.cryptoLow}</p>
                </div>
            </div>
            <div className='weather--div'>
                <div className='weather--icon--temp'>
                    <img src={props.weatherCurrency.icon} className='weather--icon'/>
                    <p className='weather--temp'>{props.weatherCurrency.temperature}</p>
                </div>
                <p className='weather--city'>{props.weatherCurrency.city}</p>
            </div>
        </div>
        <h1 className='time--website'>{props.timeCurrency}</h1>
        <p>By: {props.author}</p> 
    </main>
)

}

export default Body