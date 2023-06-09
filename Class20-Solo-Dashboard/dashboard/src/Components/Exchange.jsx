import React from 'react'
import {nanoid} from 'nanoid'

function Exchange(props) {

    let arrayCurrency = []
    var moneyExchange = Object.keys(props.rates)
    var valueExchange = Object.values(props.rates)
    for(let i = 0; i < moneyExchange.length; i++){
        let arrayOrganize = [{currency: "",
                            value: ""
                            }]
        arrayOrganize.currency = moneyExchange[i]
        arrayOrganize.value = valueExchange[i]
        arrayCurrency.push(arrayOrganize)
    }
    const returnCurrency = arrayCurrency.map(ex =>
                                                (<p>{ex.currency}: {ex.value}</p>)
                                            )
    return(
        <div>
            <p>{props.base}</p>
            {returnCurrency}
        </div>
    )
}

export default Exchange