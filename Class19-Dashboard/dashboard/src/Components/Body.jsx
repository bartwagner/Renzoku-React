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
            <div>
                {/* <img src={props.weatherCurrency.icon} />
                <p>{props.weatherCurrency.temp}</p>
                <p>{props.weatherCurrency.name}</p> */}
            </div>
        </div>
        <h1 className='time--website'>{props.timeCurrency}</h1>
        <p>By: {props.author}</p> 
    </main>
)

}

export default Body