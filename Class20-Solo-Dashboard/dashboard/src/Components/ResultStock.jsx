import React from 'react'

function ResultStock(props) {

    ///////////////////////////////////
    // Calculate the total dividends //
    ///////////////////////////////////
    let cashDividendTotal = 0
    if(props.resultStock.cashDividends){
        if(props.resultStock.cashDividends.length > 0){
            let countStocks = 0
            if(props.resultStock.cashDividends.length < 12){
                countStocks = props.resultStock.cashDividends.length
            }else{
                countStocks = 12
            }
            for(let i = 0; i < countStocks; i++){
                cashDividendTotal = cashDividendTotal + props.resultStock.cashDividends[i].rate
            }
        }
    }

    ////////////////////////////
    // The stock informations //
    //////////////////////////// 
    return(
        <div className='div--result'>
            <p>Symbol: {props.resultStock.symbol}</p>
            <p>Short Name: {props.resultStock.shortName}</p>
            <p>Currency: {props.resultStock.currency}</p>
            <p>Highest Price One Year: {props.resultStock.highestPriceOneYear}</p>
            <p>Lowest Price One Year: {props.resultStock.lowestPriceOneYear}</p>
            <p>Regular Market Price: {props.resultStock.regularMarketPrice}</p>
            <p>Regular Market Open: {props.resultStock.regularMarketOpen}</p>
            <p>Regular Market Previous Close: {props.resultStock.regularMarketPreviousClose}</p>
            <p>Regular Market Day High: {props.resultStock.regularMarketDayHigh}</p>
            <p>Regular Market Day Low: {props.resultStock.regularMarketDayLow}</p>
            <p>Cash Dividends: {cashDividendTotal.toFixed(3)}</p>
        </div>
    )    
}
export default ResultStock