import React from 'react'
import {nanoid} from 'nanoid'
import Weather from './Weather'
import ChartStock from './ChartStock'
import ResultStock from './ResultStock'
import Exchange from './Exchange'

import Option from './Option'



function Body(props) {

    const exchangeMoney = props.quotationMoney.map(ex =>(
        <Exchange
            key={nanoid()}
            base={ex.base}
            rates={ex.rates}
        />
    ))

    // start weather
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
    const usWeather = props.usWeatherCurrency.map(us =>(
        <Weather
            key={nanoid()}
            icon={us.icon}
            temperature={us.temperature}
            city={us.city}
        />
    ))
    // end weather

    return(
        <main className='main'>
            <div className='div--infor'>
                <div className='group--weather'>
                    {brWeather}
                </div>
                <Option
                    dataStocks={props.dataBrStocks}
                    stockInformation={props.stockInformation}
                    country={'br'}
                />
                <ResultStock
                   resultStock ={props.resultBrStock}
                />
                <div className='group--weather'>
                    {localweather}
                </div>
                <ResultStock
                   resultStock ={props.resultUsStock}
                />
                <Option
                    dataStocks={props.dataUsStocks}
                    stockInformation={props.stockInformation}
                    country={'us'}
                />
                <div className='group--weather'>
                    {usWeather}
                </div>
            </div>
            <div className='group--dividend'>
                <div className='div--dividend'>
                    <h3 className='grafic--data'>Dividens: {props.resultBrStock.symbol}</h3>
                    <div className='chart--stock'>
                        <ChartStock
                            resultStock = {props.resultBrStock}
                        />
                    </div>
                </div>
                <div className='div--dividend'>
                    <h3 className='grafic--data'>Dividens: {props.resultUsStock.symbol}</h3>
                    <div className='chart--stock'>
                        <ChartStock
                            resultStock = {props.resultUsStock}
                        />
                    </div>
                </div>
            </div>
            <div className='exchange'>
                {exchangeMoney}
            </div>
            <h1 className='time--website'>{props.timeCurrency}</h1>
            <div className='div--author'>
                <p className='author--img'>By: {props.author}</p> 
            </div>
        </main>
    )
}

export default Body