import React from 'react'
import {nanoid} from 'nanoid'
import SelectOption from './SelectOption'
import Weather from './Weather'
import ChartStock from './ChartStock'
import ResultStock from './ResultStock'

function Body(props) {

    const[searchBrStock, setSearchBrStock] = React.useState(props.dataBrStocks)
    const[searchUsStock, setSearchUsStock] = React.useState(props.dataUsStocks)

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
            Stock={d}
            selectStockItem={selectBrStockItem}
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
                <div className='stock--div'>
                    <div className='stock--org'>
                        <p className='p--stock'>BR Stocks:</p>
                        <div className='container'>
                            <input id='input--stock--br' className='input--stock' type="text" name="stock" onKeyUp={orderListBrStock} onFocus={() => dropDown(0)} onBlur={() => dropDown(1)} placeholder='Select one br stock'/>
                            <div className='drop--down'>
                                <div className='list--drop--down'>
                                    {options}    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ResultStock
                   resultStock ={props.resultBrStock}
                />
                <div className='group--weather'>
                    {localweather}
                </div>
                <ResultStock
                   resultStock ={props.resultBrStock}
                />
                <div className='stock--div'>
                    <div className='stock--org'>
                        <p className='p--stock'>US Stocks:</p>
                        <div className='container'>
                            <input id='input--stock--ca' className='input--stock' type="text" name="stock" /*onKeyUp={orderListBrStock} onFocus={() => dropDown(0)} onBlur={() => dropDown(1)}*/ placeholder='Select one us stock'/>
                            <div className='drop--down'>
                                <div className='list--drop--down'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='group--weather'>
                    {usWeather}
                </div>
            </div>
            <h3 className='grafic--data'>Dividens: {props.resultBrStock.symbol}</h3>
            <div className='chart--stock'>
                <ChartStock
                    resultStock = {props.resultBrStock}
                />
            </div>
            <h1 className='time--website'>{props.timeCurrency}</h1>
            <p className='author--img'>By: {props.author}</p> 
        </main>
    )
}

export default Body