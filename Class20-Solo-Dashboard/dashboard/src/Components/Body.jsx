import React from 'react'
import {nanoid} from 'nanoid'
import SelectOption from './SelectOption'

function Body(props) {

const options = props.dataBrStocks.map(d =>(
    <SelectOption
        key={nanoid()}
        brStock={d}
    />
))

return(
    <main className='main'>
        <div className="top--website">
            <div className='weather--div'>
                <div>
                    <p>BR Stocks:</p>
                    <select>
                        {options}
                    </select>
                </div>
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