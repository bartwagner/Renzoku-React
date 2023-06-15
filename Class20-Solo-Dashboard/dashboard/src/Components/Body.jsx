import React from 'react'
import {nanoid} from 'nanoid'
import Weather from './Weather'
import ChartStock from './ChartStock'
import ResultStock from './ResultStock'
import Exchange from './Exchange'
import DropDownObject from './DropDownObject'

function Body(props) {

    //////////////////////////////////////////////////////////////////
    // Send the currency and your exchanges for the Exchange Object //
    //////////////////////////////////////////////////////////////////
    const exchangeMoney = props.quotationMoney.map(ex =>(
        <Exchange
            key={nanoid()}
            base={ex.base}
            rates={ex.rates}
        />
    ))

    /////////////////////////////////////////////
    // Send the Weather for the Weather Object //
    /////////////////////////////////////////////
    const brWeather = props.brWeatherCurrency.map(bw =>(
        <Weather
            key={nanoid()}
            icon={bw.icon}
            temperature={bw.temperature}
            city={bw.city}
        />
    ))
    const localweather = (
        <Weather
            key={nanoid()}
            icon={props.weatherCurrency.icon}
            temperature={props.weatherCurrency.temperature}
            city={props.weatherCurrency.city}
        />
    )
    const usCaWeather = props.usCaWeatherCurrency.map(us =>(
        <Weather
            key={nanoid()}
            icon={us.icon}
            temperature={us.temperature}
            city={us.city}
        />
    ))

    return(
        <main className='main'>
            <div className='div--infor'>
                {/*Br weather*/}
                <div className='group--weather'>
                    {brWeather}
                </div>
                {/*Drop List BR*/}
                <DropDownObject
                    dataStocks={props.dataBrStocks}
                    stockInformation={props.stockInformation}
                    country={'br'}
                />
                {/*Result Stock BR Stock*/}
                <ResultStock
                   resultStock ={props.resultBrStock}
                />
                {/*local weather*/}
                <div className='group--weather'>
                    {localweather}
                </div>
                {/*Result Stock CA/US Stock*/}
                <ResultStock
                   resultStock ={props.resultUsCaStock}
                />
                {/*Drop List CA/US*/}
                <DropDownObject
                    dataStocks={props.dataUsCaStocks}
                    stockInformation={props.stockInformation}
                    country={'ca/us'}
                />
                {/*Us and Ca weather*/}
                <div className='group--weather'>
                    {usCaWeather}
                </div>
            </div>
            <div className='group--dividend'>
                {/*Grafic BR Stock Dividends*/}
                <div className='div--dividend'>
                    <h3 className='grafic--data'>Dividens: {props.resultBrStock.symbol}</h3>
                    <div className='chart--stock'>
                        <ChartStock
                            resultStock = {props.resultBrStock}
                        />
                    </div>
                </div>
                {/*Grafic CA/US Stock Dividends*/}
                <div className='div--dividend'>
                    <h3 className='grafic--data'>Dividens: {props.resultUsCaStock.symbol}</h3>
                    <div className='chart--stock'>
                        <ChartStock
                            resultStock = {props.resultUsCaStock}
                        />
                    </div>
                </div>
            </div>
            {/*Exchange Money*/}
            <div className='exchange'>
                {exchangeMoney}
            </div>
            {/*Time*/}
            <h1 className='time--website'>{props.timeCurrency}</h1>
            {/*Img Author*/}
            <div className='div--author'>
                <p className='author--img'>By: {props.author}</p> 
            </div>
        </main>
    )
}

export default Body