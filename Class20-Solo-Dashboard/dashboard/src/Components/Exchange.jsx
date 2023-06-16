import React from 'react'
import {nanoid} from 'nanoid'
import ExchangeValue from './ExchangeValue'

function Exchange(props) {

    //////////////////////////////////////
    // New Array and organize a new one //
    //////////////////////////////////////
    let arrayCurrency = []
    var moneyExchange = Object.keys(props.rates)
    var valueExchange = Object.values(props.rates)
    for(let i = 0; i < moneyExchange.length; i++){
        let arrayOrganize = [{currency: "",
                            value: ""
                            }]
        arrayOrganize.currency = moneyExchange[i]
        arrayOrganize.value = valueExchange[i].toFixed(2)
        arrayCurrency.push(arrayOrganize)
    }

    ////////////////////////////////////////////
    // Object that show the exchanges results //
    ////////////////////////////////////////////
    const returnCurrency = arrayCurrency.map(ex =>(
        <ExchangeValue
            key={nanoid()}
            currency={ex.currency}
            value={ex.value}
        />
    ))
    
    /////////////////////////////////
    // The components of Exchanges //
    /////////////////////////////////
    return(
        <div className='exchange--money'>
            <p className='exchange--base'>{props.base}: </p>
            {returnCurrency}
        </div>
    )
}

export default Exchange