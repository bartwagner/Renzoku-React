import React from 'react'
import {nanoid} from 'nanoid'
import SelectOption from './SelectOption'
import Weather from './Weather'
import ChartStock from './ChartStock'

function Body(props) {

    const[searchBrStock, setSearchBrStock] = React.useState(props.dataBrStocks)
    
    // window.console.log(props.resultBrStock)

    // for(let i = 0; i < 12; i++){
    //     props.resultBrStock.cashDividends[i]
    // }

    function dropDown(p){
        var e = document.getElementsByClassName('drop--down')[0];
        var d = ['block', 'none'];
        e.style.display = d[p];

        var t = ['0px','0px,-5px']
        setTimeout(function (){
            e.style.transform = 'translate('+t[p]+')';
        },0)
    }

    function selectBrStockItem(selected){
        if(selected !=''){
            document.getElementById('input--stock--br').value = selected
            props.brStockInformation(selected)
        }
    }

    function orderListBrStock(){
        let typeWrite = document.getElementById('input--stock--br').value
    
        if(typeWrite === ''){
            setSearchBrStock(props.dataBrStocks)
        } else {
            setSearchBrStock(
                props.dataBrStocks.filter(item => (item.toUpperCase().indexOf(typeWrite.toUpperCase()) > -1))
            )
        }
    }

    const options = searchBrStock.map(d =>(
        <SelectOption
            key={nanoid()}
            brStock={d}
            selectBrStockItem={selectBrStockItem}
        />
    ))

    const brWeather = props.brWeatherCurrency.map(bw =>(
        <Weather
            key={nanoid()}
            icon={bw.icon}
            temperature={bw.temperature}
            city={bw.city}
        />
    ))
    const caWeather = props.caWeatherCurrency.map(ca =>(
        <Weather
            key={nanoid()}
            icon={ca.icon}
            temperature={ca.temperature}
            city={ca.city}
        />
    ))

    return(
        <main className='main'>
            <div className='div--infor'>
                <div className='group--weather'>
                    {brWeather}
                </div>
                <div className='br--stock--div'>
                    <p className='p--br--stock'>BR Stocks:</p>
                        <div className='container'>
                            <input id='input--stock--br' className='input--stock' type="text" name="stock" onKeyUp={orderListBrStock} onFocus={() => dropDown(0)} onBlur={() => dropDown(1)} placeholder='Select one br stock'/>
                            <div className='drop--down'>
                                <div className='list--drop--down'>
                                    {options}    
                                </div>
                            </div>
                        </div>
                </div>
                <div className='div--result--br'>
                    <div className='img--symbol'>
                        <img src={props.resultBrStock.logoUrl} className='icon--stock--br'/>
                        <p>Symbol: {props.resultBrStock.symbol}</p>
                    </div>
                    <p>Short Name: {props.resultBrStock.shortName}</p>
                    <p>Currency: {props.resultBrStock.currency}</p>
                    <p>Highest Price One Year: {props.resultBrStock.highestPriceOneYear}</p>
                    <p>Lowest Price One Year: {props.resultBrStock.lowestPriceOneYear}</p>
                    <p>Regular Market Open: {props.resultBrStock.regularMarketOpen}</p>
                    <p>Regular Market Price: {props.resultBrStock.regularMarketPrice}</p>
                    <p>Regular Market Previous Close: {props.resultBrStock.regularMarketPreviousClose}</p>
                    <p>Regular Market Day High: {props.resultBrStock.regularMarketDayHigh}</p>
                    <p>Regular Market Day Low: {props.resultBrStock.regularMarketDayLow}</p>
                    <p>Cash Dividends: {}</p>
                </div>
                <div className='group--weather'>
                    {caWeather}
                </div>
            </div>
            <ChartStock className='chart--stock'
                resultStock = {props.resultBrStock}
            />
            <h1 className='time--website'>{props.timeCurrency}</h1>
            <p className='author--img'>By: {props.author}</p> 
        </main>
    )
}

export default Body