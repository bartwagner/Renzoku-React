import React from 'react'
import {nanoid} from 'nanoid'
import ExchangeValue from './ExchangeValue'

function Exchange(props) {

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

    const returnCurrency = arrayCurrency.map(ex =>(
        <ExchangeValue
            key={nanoid()}
            currency={ex.currency}
            value={ex.value}
        />
    ))
    return(
        <div className='exchange--money'>
            <p className='exchange--base'>{props.base}: </p>
            {returnCurrency}
        </div>
    )
}

export default Exchange